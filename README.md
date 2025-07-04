🚀 NexusCore Dashboard

NexusCore is a modern, web-based control panel for managing your Space Engineers dedicated servers. It uses Docker to keep your servers organized and running smoothly, all through a clean and simple interface.

(It's highly recommended to replace this with a GIF of your dashboard in action!)

✨ Core Features

🖥️ Live Server Console: Interact with your server's console directly from your web browser.

🐳 Docker-Powered: Each game server runs in its own isolated container for maximum stability.

✅ Simple Server Controls: Easily create, start, stop, and manage your servers from one place.

🔒 Secure User Login: Keep your control panel protected with a secure authentication system.

📱 Modern & Responsive UI: Manage your servers from your desktop or on the go.

🚀 Quick Start (via Docker)

Get up and running in under a minute.

Clone the repository:

Generated bash
git clone https://github.com/MarbleCeo/stellar-server-control-panel.git
cd stellar-server-control-panel


Set your secret key:
Open the docker-compose.yml file and change the JWT_SECRET to a long, random string of your choice.

Generated yaml
# in docker-compose.yml
environment:
  - JWT_SECRET=your_super_secret_and_long_random_string_here
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Yaml
IGNORE_WHEN_COPYING_END

Launch the dashboard:

Generated bash
docker-compose up -d --build
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

You can now access your new dashboard at http://localhost:3000.

❤️ Like NexusCore? Support Its Development!

Hey there! NexusCore is a passion project built to make managing Space Engineers servers easier for everyone. I've poured many hours into developing and refining it in my free time.

If you find this tool useful and want to help support its future, please consider buying me a coffee!

Every contribution, big or small, is incredibly motivating and helps fuel the late-night coding sessions needed to add new features, fix bugs, and keep the project alive. Thank you for your support!

<a href="https://www.buymeacoffee.com/your_username" target="_blank">
<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
</a>

License

MIT

#space-engineers #gameserver #control-panel #dashboard #docker #nodejs #react #server-management #game-hosting #expressjs #socketio #javascript
