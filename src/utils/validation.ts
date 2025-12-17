import { isValidPhoneNumber } from 'libphonenumber-js';

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
  'temp-mail.org', '10minutemail.com', 'fakeinbox.com', 'trashmail.com',
  'tempinbox.com', 'dispostable.com', 'sharklasers.com', 'yopmail.com',
  'getnada.com'
];

// Fake local part patterns
const FAKE_PATTERNS = [
  'test', 'fake', 'asdf', 'qwerty', 'admin', 'user', 
  'example', 'sample', 'demo'
];

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  const domain = email.split('@')[1]?.toLowerCase();
  const localPart = email.split('@')[0]?.toLowerCase();

  // Check for disposable domains
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: 'Please use a non-disposable email address.' };
  }

  // Check for "fake" patterns
  if (localPart && FAKE_PATTERNS.some(p => localPart === p || localPart.startsWith(p + '123'))) {
    return { isValid: false, error: 'Please enter your real email address.' };
  }

  return { isValid: true };
};

export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Use libphonenumber-js for validation (defaulting to US if no country code provided)
  // Note: isValidPhoneNumber handles international formats if + is present
  if (!isValidPhoneNumber(phone, 'US')) {
     return { isValid: false, error: 'Please enter a valid phone number.' };
  }

  const cleaned = phone.replace(/[^\d]/g, '');

  // Block repeated digits (e.g., 5555555555)
  // Checking for 6+ repeated digits as a heuristic to catch obvious fakes
  if (/^(\d)\1{5,}$/.test(cleaned)) { 
    return { isValid: false, error: 'Please enter a valid phone number.' };
  }
  
  // Block obvious sequences
  const sequences = ['1234567890', '0987654321', '1234512345'];
  if (sequences.some(seq => cleaned.includes(seq))) {
      return { isValid: false, error: 'Please enter a valid phone number.' };
  }

  // Entropy check: if any two digits make up more than 70% of the number
  // This catches mash inputs like "12233332265" (mostly 2s and 3s)
  const digitCounts: Record<string, number> = {};
  for (const char of cleaned) {
    digitCounts[char] = (digitCounts[char] || 0) + 1;
  }
  const counts = Object.values(digitCounts).sort((a, b) => b - a);
  const topTwoSum = (counts[0] || 0) + (counts[1] || 0);
  
  if (topTwoSum / cleaned.length > 0.7) {
    return { isValid: false, error: 'Please enter a valid phone number.' };
  }

  return { isValid: true };
};

export const isBotSubmission = (startTime: number): boolean => {
  const timeTaken = Date.now() - startTime;
  return timeTaken < 2000;
};
