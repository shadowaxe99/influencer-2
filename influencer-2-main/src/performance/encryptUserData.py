from cryptography.fernet import Fernet

# Function to generate a key and instantiate a Fernet object

def generate_key():
    """Generate a key for encryption."""
    return Fernet.generate_key()

# Function to encrypt a message

def encrypt_message(message, key):
    """Encrypt a message using the provided key."""
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode())
    return encrypted_message

# Function to decrypt an encrypted message

def decrypt_message(encrypted_message, key):
    """Decrypt an encrypted message using the provided key."""
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message)
    return decrypted_message.decode()

# Example usage:
# key = generate_key()
# encrypted = encrypt_message('encrypt this message', key)
# decrypted = decrypt_message(encrypted, key)
