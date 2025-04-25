<script>
import { io } from "socket.io-client";
export default {
data() {
  return {
    isOpen: false,
    newMessage: '',
    messages: [],
    userName: '',
    userImage: '',
    socket: null,
  };
},
methods: {
  toggleChat() {
    this.isOpen = !this.isOpen;
  },
  async sendMessage() {
    if (this.newMessage.trim()) {
      const userId = Number(localStorage.getItem("userId"));
      const messageToSend = this.newMessage;

      try {
        const res = await fetch("http://localhost:3300/chatmessages/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, message: messageToSend }),
        });
        const newMessage = await res.json();

        if (!this.messages.some(msg => msg.id === newMessage.id)) {
          this.messages.push(newMessage);
        }
        this.newMessage = ''; 
      } catch (err) {
        console.error("Hiba az üzenet küldésekor:", err);
      }
    }
  },
  async fetchUserData() {
    const userID = Number(localStorage.getItem("userId"));
    if (userID) {
      try {
        const res = await fetch(`http://localhost:3300/user/getUserById/${userID}`);
        const data = await res.json();
        this.userName = data.username;
        this.userImage = data.profilkep || '';
      } catch (err) {
        console.error('Hiba a felhasználói adatok lekérésekor:', err);
      }
    } else {
      console.error('Felhasználó nem bejelentkezve!');
    }
  },
  async fetchMessages() {
    try {
      const res = await fetch('http://localhost:3300/chatmessages/getMessages');
      const data = await res.json();
      this.messages = await Promise.all(data.map(async (msg) => {
        if (!msg.userImage || !msg.userName) {
          const user = await this.fetchUserById(msg.userId);
          msg.userName = user.username || 'Név Nélkül';
          msg.userImage = user.profilkep || '';
        }
        return msg;
      }));
    } catch (err) {
      console.error('Hiba az üzenetek lekérésekor:', err);
    }
  },
  async fetchUserById(userId) {
    try {
      const res = await fetch(`http://localhost:3300/user/getUserById/${userId}`);
      return await res.json();
    } catch (err) {
      console.error('Hiba a felhasználói adatok lekérésekor:', err);
      return { username: 'Név Nélkül', profilkep: '' };
    }
  }
},
mounted() {
  this.fetchUserData();
  this.fetchMessages();

  this.socket = io("http://localhost:3300");

  this.socket.on("newMessage", async (msg) => {
    if (!msg.userImage || !msg.userName) {
      const user = await this.fetchUserById(msg.userId);
      msg.userName = user.username || 'Név Nélkül';
      msg.userImage = user.profilkep || '';
    }

    if (!this.messages.some(existingMsg => existingMsg.id === msg.id)) {
      this.messages.push(msg);
    }
  });
}
}
</script>

<template>
  <div>

    <div class="chat-sidebar" :class="{ open: isOpen }">
      <div v-if="isOpen" class="chat-header" @click="toggleChat">
        🔽 Chat bezárása
      </div>

      <transition name="fade">
        <div class="chat-body" v-if="isOpen"> 
          <div class="chat-messages">
            <div v-for="(msg, index) in messages" :key="index" class="chat-message">
              <div class="message-header">
                <img v-if="msg.userImage" :src="msg.userImage"  class="user-avatar" />
                <span class="user-name">{{ msg.userName || 'Név Nélkül' }}</span>
              </div>
              <div class="message-text">
                {{ msg.message }}
              </div>
            </div>
          </div>
          <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Írj valamit..." />
            <button @click="sendMessage">Küldés</button>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="!isOpen" class="chat-toggle-button" @click="toggleChat" title="Chat megnyitása">
      💬
    </div>
  </div>
</template>

<style scoped>

.chat-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 360px;
  background: #ffffff;
  border-left: 3px solid #6a11cb;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.chat-sidebar:not(.open) {
  transform: translateX(100%);
}

.chat-header {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 16px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  border-bottom: 2px solid #ccc;
}

.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  max-height: calc(100vh - 160px);
}

.chat-message {
  background: #f1f1f1;
  padding: 8px 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 0.95rem;
  max-width: 80%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.message-text {
  font-size: 0.9rem;
  color: #555;
}

.chat-input {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.chat-input button {
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.chat-input button:hover {
  background: #1a5fe0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.chat-toggle-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #2575fc;
  color: white;
  padding: 14px 18px;
  border-radius: 50%;
  font-size: 1.6rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.chat-toggle-button:hover {
  transform: scale(1.1);
}
</style>