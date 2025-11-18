# 🌐 Network Sharing Guide - Quick Mobile Customer

## 🎯 **Share Your Project on Local Network (152.28.3.220)**

### **✅ Setup Complete!**

Your project is now configured to share on the local network.

### **🚀 Start the Server**

Run this command in your project directory:

```bash
npm run dev:network
```

Or alternatively:

```bash
npm run dev -- --host 0.0.0.0
```

### **📱 Access URLs**

After starting the server, your project will be available at:

- **Local Access**: `http://localhost:3000`
- **Network Access**: `http://152.28.3.220:3000`

### **👥 Share with Team Members**

Anyone on the same network can access your project by visiting:

```
http://152.28.3.220:3000
```

### **🔧 Configuration Details**

Your `vite.config.js` is configured with:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external connections
    port: 3000, // Port number
    strictPort: true, // Fail if port is in use
  },
});
```

### **📋 Available Scripts**

```bash
# Start with network access
npm run dev:network

# Regular development (localhost only)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **🛠️ Troubleshooting**

#### **If Port 3000 is Busy:**

```bash
# Use a different port
npm run dev -- --host 0.0.0.0 --port 3001
```

#### **If Network Access Doesn't Work:**

1. Check your firewall settings
2. Ensure you're on the same network
3. Try accessing with the specific IP: `http://152.28.3.220:3000`

#### **Check Your IP Address:**

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### **🔒 Security Notes**

- This setup is for **development only**
- Don't use this configuration in production
- Only devices on your local network can access the project
- The server will stop when you close the terminal

### **📱 Mobile Testing**

Perfect for testing your responsive design on:

- ✅ Mobile phones
- ✅ Tablets
- ✅ Other computers on the network
- ✅ Different browsers

### **🎉 Ready to Share!**

Your Quick Mobile Customer project is now ready to be shared on your local network at:

**`http://152.28.3.220:3000`**

Just run `npm run dev:network` and share the URL with your team!

---

_Network sharing configured: October 2024_  
_Ready for local network collaboration and testing_
