use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::{BufReader, Read};
use std::path::Path;

/// Hash a file using SHA-256
/// Returns hex-encoded hash string
pub fn hash_file(path: &str) -> String {
    hash_file_path(Path::new(path))
}

/// Hash a file using SHA-256 (Path version)
pub fn hash_file_path(path: &Path) -> String {
    match File::open(path) {
        Ok(file) => {
            let mut reader = BufReader::new(file);
            let mut hasher = Sha256::new();
            let mut buffer = [0u8; 8192]; // 8KB buffer

            loop {
                match reader.read(&mut buffer) {
                    Ok(0) => break, // EOF
                    Ok(n) => hasher.update(&buffer[..n]),
                    Err(_) => return String::new(), // Read error, return empty
                }
            }

            let result = hasher.finalize();
            hex::encode(result)
        }
        Err(_) => String::new(), // Can't open file, return empty
    }
}

/// Hash a string/bytes using SHA-256
/// Used for computing folder hashes from child hashes
pub fn hash_bytes(data: &[u8]) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    hex::encode(result)
}

/// Hash a string using SHA-256
pub fn hash_string(s: &str) -> String {
    hash_bytes(s.as_bytes())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_string() {
        // SHA-256 of empty string
        let empty = hash_string("");
        assert_eq!(
            empty,
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        );

        // SHA-256 of "hello"
        let hello = hash_string("hello");
        assert_eq!(
            hello,
            "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        );
    }

    #[test]
    fn test_hash_bytes() {
        let data = b"test data";
        let hash = hash_bytes(data);
        assert!(!hash.is_empty());
        assert_eq!(hash.len(), 64); // SHA-256 produces 32 bytes = 64 hex chars
    }
}
