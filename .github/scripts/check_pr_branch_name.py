import http.client
import json
import os
from urllib.parse import urlparse
import sys  # Import sys for exit functionality

branch_name = os.getenv('BRANCH_NAME', '')
pr_creator = os.getenv('PR_CREATOR', '')
webhook_url = os.getenv('DISCORD_ALERT_DEVELOP_WEBHOOK_URL', '')

# Dynamically get repository information
github_repository = os.getenv('GITHUB_REPOSITORY', 'mc14labs/interface')  # Default if not set

# Try to get the PR number directly from an environment variable or parse it from the GitHub event path
pr_number = os.getenv('PR_NUMBER')
if not pr_number:
    event_path = os.getenv('GITHUB_EVENT_PATH', '')
    if event_path:
        try:
            with open(event_path, 'r') as event_file:
                event_data = json.load(event_file)
                pr_number = event_data.get('pull_request', {}).get('number')
        except Exception as e:
            print(f"Error reading GitHub event file: {e}")
            sys.exit(1)  # Exit if the PR number can't be read

if not pr_number:
    print("PR number not found.")
    sys.exit(1)

# Construct the PR URL dynamically
pr_url = f"https://github.com/{github_repository}/pull/{pr_number}"

# Mapping from GitHub usernames to Discord user IDs
github_to_discord_mapping = {
    "asalef10": "1130376965354954823",
    "4tal": "459310419056525324",
    "Tomelia1999": "1160224372313833472",
    "galbit": "1082599634519719986",
}

# Check for missing 'CU' prefix in branch name and alert if necessary
if 'CU' not in branch_name:
    alert_message = json.dumps({
        "embeds": [
            {
                "title": "Branch Naming Alert",
                "description": f"Interface : Pull request for branch '{branch_name}' is missing 'CU' prefix. Created by <@{github_to_discord_mapping.get(pr_creator, pr_creator)}>. Please ensure the branch name is linked correctly to ClickUp tasks. PR URL: {pr_url}",
                "color": 16711680  # Red color
            }
        ],
        "content": f"<@{github_to_discord_mapping.get(pr_creator, pr_creator)}>"
    })

    parsed_url = urlparse(webhook_url)
    connection = http.client.HTTPSConnection(parsed_url.hostname)
    headers = {
        "Content-Type": "application/json",
        "Content-Length": str(len(alert_message))
    }

    connection.request("POST", parsed_url.path, body=alert_message, headers=headers)
    response = connection.getresponse()
    connection.close()

    # Handle non-success response from Discord
    if response.status != 204:
        print(f"Failed to send Discord webhook message, status code: {response.status}")

    print("::error::Branch naming convention violation detected.")
    sys.exit(1)  # Ensure script exits with a non-zero status to indicate failure

 