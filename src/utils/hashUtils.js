import sha256 from 'js-sha256';

// Function to hash array data
function hashArray(array) {
  const jsonString = JSON.stringify(array);
  return sha256(jsonString);
}

// Function to encode data to Base64
function encodeBase64(data) {
  return btoa(data);
}

// Function to decode Base64 data
function decodeBase64(data) {
  return atob(data);
}

// Function to store an array along with its hash
export function setArray(key, array) {
  try {
    const jsonString = JSON.stringify(array);
    const hash = hashArray(array);
    const dataWithHash = {
      array: encodeBase64(jsonString),
      hash: hash
    };
    localStorage.setItem(key, JSON.stringify(dataWithHash));
  } catch (error) {
    console.error('Store error:', error);
  }
}

// Function to retrieve and verify an array
export function getArray(key) {
  try {
    const dataWithHash = localStorage.getItem(key);
    if (dataWithHash) {
      const { array: encodedJsonString, hash: storedHash } = JSON.parse(dataWithHash);
      const jsonString = decodeBase64(encodedJsonString);
      const array = JSON.parse(jsonString);
      const computedHash = hashArray(array);
      if (storedHash === computedHash) {
        return array;
      } else {
        console.error('Data integrity check failed: hash mismatch.');
        return []; // or handle the integrity failure case as needed
      }
    }
    return [];
  } catch (error) {
    console.error('Retrieve error:', error);
    return [];
  }
}
