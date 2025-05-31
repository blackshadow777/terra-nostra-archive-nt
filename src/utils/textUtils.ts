
/**
 * Sanitizes text input by trimming whitespace and normalizing spaces
 */
export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitizes all string values in an object
 */
export const sanitizeFilters = <T extends Record<string, any>>(filters: T): T => {
  const sanitized = { ...filters };
  
  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeText(sanitized[key]);
    }
  });
  
  return sanitized;
};

/**
 * Splits full name into first and last name parts
 */
export const parseFullName = (fullName: string): { christian_name: string; surname: string } => {
  const sanitizedName = sanitizeText(fullName);
  const nameParts = sanitizedName.split(' ');
  
  if (nameParts.length >= 2) {
    return {
      christian_name: nameParts[0],
      surname: nameParts.slice(1).join(' '),
    };
  }
  
  return {
    christian_name: nameParts[0] || '',
    surname: '',
  };
};
