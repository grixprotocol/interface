export const showTransactionToast = ({
  title,
  description,
  status, // 'success' | 'error' | 'warning' | 'info'
  txLink,
  duration = 5000,
}: {
  title: string;
  description: string;
  status: 'success' | 'error' | 'warning' | 'info';
  txLink?: string;
  duration?: number;
}) => {
  // Create the toast container
  const toastContainer = document.createElement('div');
  toastContainer.style.position = 'fixed';
  toastContainer.style.top = '20px'; // Padding from the top
  toastContainer.style.right = '20px'; // Padding from the right
  toastContainer.style.zIndex = '1050';
  toastContainer.style.maxWidth = '280px';
  toastContainer.style.padding = '12px 16px';
  toastContainer.style.borderRadius = '8px';
  toastContainer.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
  toastContainer.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
  toastContainer.style.opacity = '1';
  toastContainer.style.transform = 'translateY(0)';

  // Set background color and border based on status
  if (status === 'success') {
    toastContainer.style.backgroundColor = '#2C2C2C'; // Dark gray background for success
    toastContainer.style.border = '1px solid #4CAF50'; // Subtle green border for success
  } else if (status === 'error') {
    toastContainer.style.backgroundColor = '#2C2C2C'; // Dark gray background for error
    toastContainer.style.border = '1px solid #F44336'; // Subtle red border for error
  } else if (status === 'warning') {
    toastContainer.style.backgroundColor = '#2C2C2C'; // Dark gray background for warning
    toastContainer.style.border = '1px solid #FF9800'; // Subtle orange border for warning
  } else {
    toastContainer.style.backgroundColor = '#2C2C2C'; // Dark gray background for info
    toastContainer.style.border = '1px solid #2196F3'; // Subtle blue border for info
  }

  // Create the title
  const toastTitle = document.createElement('div');
  toastTitle.style.fontSize = '14px';
  toastTitle.style.fontWeight = '600';
  toastTitle.style.color = '#FFFFFF'; // White color for the title
  toastTitle.style.marginBottom = '6px';
  toastTitle.innerText = title;
  toastContainer.appendChild(toastTitle);

  // Create the description
  const toastDescription = document.createElement('div');
  toastDescription.style.fontSize = '12px';
  toastDescription.style.lineHeight = '1.4';
  toastDescription.style.color = '#E0E0E0'; // Lighter gray for description text
  toastDescription.style.marginBottom = txLink ? '12px' : '0';
  toastDescription.innerText = description;
  toastContainer.appendChild(toastDescription);

  // Add a link button if txLink is provided
  if (txLink) {
    const toastLink = document.createElement('a');
    toastLink.href = txLink;
    toastLink.target = '_blank';
    toastLink.rel = 'noopener noreferrer';
    toastLink.innerText = 'View Transaction';
    toastLink.style.display = 'inline-block';
    toastLink.style.padding = '6px 12px';
    toastLink.style.backgroundColor = '#FFFFFF'; // White background for the link
    toastLink.style.color = status === 'success' ? '#4CAF50' : '#F44336'; // Match link color with status
    toastLink.style.textDecoration = 'none';
    toastLink.style.borderRadius = '4px';
    toastLink.style.fontSize = '12px';
    toastLink.style.fontWeight = '500';
    toastLink.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    toastContainer.appendChild(toastLink);
  }

  // Append the toast container to the body
  document.body.appendChild(toastContainer);

  // Animate fade-out and slide-up after a delay
  setTimeout(() => {
    toastContainer.style.opacity = '0';
    toastContainer.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      document.body.removeChild(toastContainer);
    }, 400); // Matches the transition duration
  }, duration);
};
