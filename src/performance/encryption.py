```python
from cryptography.fernet import Fernet

class EncryptionService:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.key)

    def encrypt_data(self, data):
        cipher_text = self.cipher_suite.encrypt(data.encode())
        return cipher_text

    def decrypt_data(self, cipher_text):
        plain_text = self.cipher_suite.decrypt(cipher_text)
        return plain_text.decode()

# Example usage
encryption_service = EncryptionService()

# Encrypt user profile data
encrypted_user_profile = encryption_service.encrypt_data(userProfile)

# Decrypt user profile data
decrypted_user_profile = encryption_service.decrypt_data(encrypted_user_profile)
```