import { NotificationSettings, WebhookDestination } from './types';

// Get status message and color based on validation
export const getStatusInfo = (settings: NotificationSettings) => {
  if (settings.type === WebhookDestination.DISCORD) {
    if (!settings.webhookUrl?.trim()) {
      return {
        text: 'WAITING FOR URL',
        color: '#ED8936',
        shadow: '0 0 10px #ED8936',
        buttonText: 'ENTER WEBHOOK URL',
        hoverMessage: 'Please enter your Discord webhook URL to continue',
      };
    }
  } else if (settings.type === WebhookDestination.TELEGRAM) {
    if (!settings.botToken?.trim()) {
      return {
        text: 'NEED BOT TOKEN',
        color: '#ED8936',
        shadow: '0 0 10px #ED8936',
        buttonText: 'ENTER BOT TOKEN',
        hoverMessage: 'Please enter your Telegram bot token to continue',
      };
    }
    if (!settings.chatId?.trim()) {
      return {
        text: 'NEED CHAT ID',
        color: '#ED8936',
        shadow: '0 0 10px #ED8936',
        buttonText: 'ENTER CHAT ID',
        hoverMessage: 'Please enter your Telegram chat ID to continue',
      };
    }
  }
  return {
    text: 'READY TO LAUNCH',
    color: '#48BB78',
    shadow: '0 0 10px #48BB78',
    buttonText: 'LAUNCH SIGNAL',
    hoverMessage: 'Click to launch your signal!',
  };
};
