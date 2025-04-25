import 'semantic-ui-css/semantic.min.css';
import './App.css';

import React, { Component } from 'react';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  MenuItem,
  Segment,
} from 'semantic-ui-react';
import io from 'socket.io-client';

import Chat from './Chat';
import ExamBG from './ExamBG';
import ExamBG2 from './ExamBG2';
import ExamBG3 from './ExamBG3';
import ExamBG4 from './ExamBG4';
import ExamBG5 from './ExamBG5';
import ExamBG6 from './ExamBG6';
import ExamBTDI from './ExamBTDI';
import ExamBTDI2 from './ExamBTDI2';
import ExamBTDI3 from './ExamBTDI3';
import ExamBTDI4 from './ExamBTDI4';
import ExamBTDI5 from './ExamBTDI5';
import ExamBTDI6 from './ExamBTDI6';
import ExamBTDS from './ExamBTDS';
import ExamBTDS2 from './ExamBTDS2';
import ExamBTDS3 from './ExamBTDS3';
import ExamBTDS4 from './ExamBTDS4';
import ExamBTDS5 from './ExamBTDS5';
import ExamBTDS6 from './ExamBTDS6';
import Exams from './Exams';
import Messages from './Messages';
import ProgressGraph from './ProgressGraph';
import RatingSection from './RatingSection';
import SearchBar from './SearchBar';
import StudyGuides from './study_guides';
import UserProfile from './UserProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
      rooms: [],
      userRooms: [],
      user: null,
      currentRoom: "",
      selectedRoom: null,
      messages: [],
      searchQuery: "", 
      selectedExamBG: null,
      selectedExamBTDS: null,
      selectedExamBTDI: null,
      Progress: null,
    };

   // Bind methods
   this.joinChatRoom = this.joinChatRoom.bind(this);
   this.createChatRoom = this.createChatRoom.bind(this);
   this.openChat = this.openChat.bind(this);
   this.sendMessage = this.sendMessage.bind(this);
   this.handleLogin = this.handleLogin.bind(this);
   this.handleLogout = this.handleLogout.bind(this);
   this.openExam = this.openExam.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.selectExamBGSemester = this.selectExamBGSemester.bind(this);
    this.selectExamBTDSSemester = this.selectExamBTDSSemester.bind(this);
    this.selectExamBTDISemester = this.selectExamBTDISemester.bind(this);
    
 }



// Function to handle menu clicks
handleMenuClick(name) {
  this.setState({ activeItem: name });
}

  componentDidMount() {
    // Load chat rooms
    this.fetchRooms();
  
    // Load user data from localStorage
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const rooms = JSON.parse(localStorage.getItem("rooms"));

  
    if (userId && username && role && rooms) {
      this.setState(
        {
          user: { id: userId, username, role },
          userRooms: rooms,
        },
        () => {
          // Initialize socket only if it doesn't exist
          if (!this.socket) {
            this.initializeSocket(userId, role);
          }

          // Fetch user profile
          this.fetchUserProfile(userId, role);
        }
      );
    }
  }

  // Initialize socket connection and setup event listeners
  initializeSocket(userId, role) {
    if (!userId || !role) {
      console.error("Cannot initialize socket without userId and role.");
      return;
    }
  
    if (this.socket) {
      console.log("Socket ya está inicializado.");
      return;
    }
  
    this.socket = io(`${import.meta.env.VITE_API_URL}`, {
      query: { userId, role },
    });
  
    this.socket.on("receive_message", (data) => {
      if (data.room === `room_${this.state.currentRoom}`) {
        this.setState((prevState) => {
          const exists = prevState.messages.some(
            (msg) =>
              msg.message === data.message &&
              msg.senderId === data.senderId &&
              msg.timestamp === data.timestamp
          );
  
          if (!exists) {
            return { messages: [...prevState.messages, data] };
          }
          return prevState;
        });
      }
    });
  }

  
  componentWillUnmount() {
    // Save user data to localStorage
    const { user, userRooms } = this.state;
    if (user) {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);
      localStorage.setItem("rooms", JSON.stringify(userRooms));
    }
  
    // Disconnect and clean up socket
    if (this.socket) {
      this.socket.off("receive_message"); // Remove all listeners
      this.socket.disconnect(); // Disconnect socket
      this.socket = null; // Clean socket reference
    }
  }
  
  
  loadChatHistory = async (roomId) => {
    if (!roomId) {
      console.error("roomId no está definido.");
      return;
    }
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/historial/${roomId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
  
      this.setState((prevState) => {
        const newMessages = data.filter((newMsg) =>
          !prevState.messages.some(
            (msg) =>
              msg.message === newMsg.message &&
              msg.senderId === newMsg.senderId &&
              msg.timestamp === newMsg.timestamp
          )
        );
        return { messages: [...prevState.messages, ...newMessages] };
      });
    } catch (err) {
      console.error("Error al cargar historial:", err);
    }
  };

  goToExams = () => {
    this.setState({ activeItem: "exams" }); // Cambiar a la pestaña Exams
  };


  fetchRooms = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms`)
      .then((res) => res.json())
      .then((data) => this.setState({ rooms: data }))
      .catch((err) => console.error("Error al cargar salas:", err));
  };

  fetchUserProfile = (userId, role) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${userId}/${role}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: {
            ...this.state.user,
            ...data,
          },
        });
      })
      .catch((err) => console.error("Error al cargar perfil:", err));
  };

  ffetchUserRooms = (userId, role) => {
    if (!userId || !role) {
      console.error("User ID o Role no definido.");
      return;
    }
  
    fetch(`${import.meta.env.VITE_API_URL}/userRooms/${userId}/${role}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Salas obtenidas:", data);
        this.setState({ userRooms: data });
      })
      .catch((err) => {
        console.error("Error al obtener las salas del usuario:", err);
        this.setState({ userRooms: [] });
      });
  };
  

  handleLogin = async () => {
    const usuario = prompt("Ingrese su usuario:");
    const contrasena = prompt("Ingrese su contraseña:");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await res.json();
      if (data.success) {
        this.setState(
          {
            user: { id: data.userId, username: data.username, role: data.role },
            userRooms: data.rooms,
            activeItem: "home", // Set activeItem to home after login
          },
          () => {
            this.socket = io(`${import.meta.env.VITE_API_URL}`, {
              query: {
                userId: this.state.user.id,
                role: this.state.user.role,
              },
            });

            this.socket.on("receive_message", (data) => {
              if (data.room === `room_${this.state.currentRoom}`) {
                this.setState((prevState) => ({
                  messages: [...prevState.messages, data],
                }));
              }
            });

            this.fetchRooms();
            this.fetchUserProfile(data.userId, data.role); // Fetch profile data after login
          }
        );
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error en login:", err);
    }
  };


  createChatRoom = () => {
    const formData = new FormData();
    const roomName = prompt("Ingrese el nombre de la sala:");
    const roomDescription = prompt("Ingrese una descripción para la sala:");
  
    const roomImage = document.createElement('input');
    roomImage.type = 'file';
    roomImage.accept = 'image/*';
    roomImage.style.display = 'none'; // Ocultar el elemento de entrada de archivo
  
    document.body.appendChild(roomImage);
  
    roomImage.onchange = async () => {
      const file = roomImage.files[0];
      formData.append('name', roomName);
      formData.append('description', roomDescription);
      formData.append('fotoSala', file);
      formData.append('userId', this.state.user.id);
      formData.append('role', this.state.user.role);
  
      const isPrivate = confirm("¿Desea que la sala sea privada?");
      formData.append('isPrivate', isPrivate);
  
      if (isPrivate) {
        const roomPassword = prompt("Ingrese la contraseña para la sala privada:");
        formData.append('password', roomPassword);
      }
  
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/createRoom`, {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        if (data.room) {
          this.setState({
            currentRoom: data.room.id,
            selectedRoom: data.room,
            activeItem: "messages"
          }, async () => {
            await this.joinChatRoom(data.room); // Unirse automáticamente a la sala creada
            this.fetchRooms(); // Actualizar lista de salas
            this.fetchUserRooms(this.state.user.id, this.state.user.role); // Actualizar lista de salas del usuario
          });
        }
      } catch (err) {
        console.error("Error al crear sala:", err);
      }
  
      document.body.removeChild(roomImage);
      document.body.removeChild(container); // Eliminar el contenedor que incluye el botón
    };
  
    // Crear un contenedor para el botón y centrarlo
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = '1000'; // Asegurarse de que esté en el frente
  
    // Crear el botón
    const fileButton = document.createElement('button');
    fileButton.innerText = 'Seleccionar Imagen';
    fileButton.onclick = () => {
      roomImage.click();
    };
  
    container.appendChild(fileButton);
    document.body.appendChild(container);
  };

  joinChatRoom = async (room) => {
    const { user } = this.state;

    if (room.is_private) {
      const password = prompt("Ingrese la contraseña para unirse a la sala privada:");

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/joinRoom`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: room.id,
            password,
            userId: user.id,
            role: user.role
          }),
        });

        const data = await res.json();
        if (data.room) {
          console.log("Unido a la sala privada:", data.room);
          this.setState((prevState) => ({
            currentRoom: data.room.id,
            selectedRoom: data.room,
            activeItem: "messages",
            userRooms: [...prevState.userRooms, data.room] // Actualizar userRooms al unirse a una nueva sala
          }), () => {
            this.loadChatHistory(data.room.id);
            if (this.socket) {
              this.socket.emit("join_room", `room_${data.room.id}`);
            }
          });
        } else {
          alert("Contraseña incorrecta.");
        }
      } catch (err) {
        console.error("Error al unirse a la sala:", err);
      }
    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/joinRoom`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: room.id,
            userId: user.id,
            role: user.role
          }),
        });

        const data = await res.json();
        if (data.room) {
          console.log("Unido a la sala pública:", data.room);
          this.setState((prevState) => ({
            currentRoom: data.room.id,
            selectedRoom: data.room,
            activeItem: "messages",
            userRooms: [...prevState.userRooms, data.room] // Actualizar userRooms al unirse a una sala pública
          }), () => {
            this.loadChatHistory(data.room.id);
            if (this.socket) {
              this.socket.emit("join_room", `room_${data.room.id}`);
            }
          });
        }
      } catch (err) {
        console.error("Error al unirse a la sala:", err);
      }
    }
  };

  openChat = (roomId) => {
    if (!roomId) {
      console.error("roomId no está definido.");
      return;
    }
  
    this.setState(
      { currentRoom: roomId, messages: [] }, // Limpia el estado de mensajes antes de cargar el historial
      () => {
        this.loadChatHistory(roomId);
        if (this.socket) {
          this.socket.emit("join_room", `room_${roomId}`);
        }
      }
    );
  };

  sendMessage = (message) => {
    const { currentRoom, user } = this.state;
  
    if (typeof message !== "string" || message.trim() === "") {
      console.error("El mensaje no es válido:", message);
      return;
    }
  
    const messageData = {
      room: `room_${currentRoom}`,
      message: message.trim(),
      senderId: user.id,
      username: user.username,
      role: user.role,
      timestamp: new Date().toISOString(),
    };
  
    // Emitir el mensaje al servidor
    if (this.socket) {
      this.socket.emit("send_message", messageData);
    }
  
    // Actualizar el estado local si no existe el mensaje
    this.setState((prevState) => {
      const exists = prevState.messages.some(
        (msg) =>
          msg.message === messageData.message &&
          msg.senderId === messageData.senderId &&
          msg.timestamp === messageData.timestamp
      );
      if (!exists) {
        return { messages: [...prevState.messages, messageData] };
      }
      return prevState;
    });

    // Guardar el mensaje en el backend
    fetch(`${import.meta.env.VITE_API_URL}/saveMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: currentRoom,
        senderId: user.id,
        message: message.trim(),
        username: user.username,
        role: user.role,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Mensaje guardado:", data))
      .catch((err) => console.error("Error al guardar mensaje:", err));
  };

 

  openExam = (examName) => {
    if (examName === "examBG") {
      this.setState({ selectedExamBG: true, selectedExamBTDS: null, selectedExamBTDI: null });
    } else if (examName === "examBTDS") {
      this.setState({ selectedExamBTDS: true, selectedExamBG: null, selectedExamBTDI: null });
    } else if (examName === "examBTDI") {
      this.setState({ selectedExamBTDI: true, selectedExamBG: null, selectedExamBTDS: null });
    }
  };

  selectExamBGSemester(semester) {
    const semesterMap = {
      "Primer Semestre BG": "examBG",
      "Segundo Semestre BG": "examBG2",
      "Tercer Semestre BG": "examBG3",
      "Cuarto Semestre BG": "examBG4",
      "Quinto Semestre BG": "examBG5",
      "Sexto Semestre BG": "examBG6",
    };
  
    const activeItem = semesterMap[semester];
  
    if (activeItem) {
      this.setState({ activeItem, selectedExam: semester }); // Renderizar el examen correspondiente al semestre
    } else {
      alert("El examen para este semestre aún no está disponible.");
    }
  }


  selectExamBTDSSemester(semester) {
    const semesterMap = {
      "Primer Semestre BTDS": "examBTDS",
      "Segundo Semestre BTDS": "examBTDS2",
      "Tercer Semestre BTDS": "examBTDS3",
      "Cuarto Semestre BTDS": "examBTDS4",
      "Quinto Semestre BTDS": "examBTDS5",
      "Sexto Semestre BTDS": "examBTDS6",
    };
  
    const activeItem = semesterMap[semester];
  
    if (activeItem) {
      this.setState({ activeItem, selectedExam: semester }); // Renderizar el examen correspondiente al semestre
    } else {
      alert("El examen para este semestre aún no está disponible.");
    }
  }
  
  selectExamBTDISemester(semester) {
    const semesterMap = {
      "Primer Semestre BTDI": "examBTDI",
      "Segundo Semestre BTDI": "examBTDI2",
      "Tercer Semestre BTDI": "examBTDI3",
      "Cuarto Semestre BTDI": "examBTDI4",
      "Quinto Semestre BTDI": "examBTDI5",
      "Sexto Semestre BTDI": "examBTDI6",
    };
  
    const activeItem = semesterMap[semester];
  
    if (activeItem) {
      this.setState({ activeItem, selectedExam: semester }); // Renderizar el examen correspondiente al semestre
    } else {
      alert("El examen para este semestre aún no está disponible.");
    }
  }
  handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("rooms");

    // Redirect to login page
    window.location.href = "/login";
  }

  render() {
    const { activeItem, rooms, userRooms, user, messages, currentRoom, searchQuery,  selectedExamBG, selectedExamBTDS, selectedExamBTDI, } = this.state;
    
    // El filtrado debe hacerse ANTES del return y fuera del bloque de renderizado
    const filteredRooms = rooms.filter(room => 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="app-container">
        <Menu secondary>
          <MenuItem
            name="home"
            active={activeItem === "home"}
            onClick={() => this.setState({ activeItem: "home" })}
          />
          <MenuItem
            name="messages"
            active={activeItem === "messages"}
            onClick={() => this.setState({ activeItem: "messages" })}
          />
          <MenuItem
            name="rooms"
            active={activeItem === "rooms"}
            onClick={() => this.setState({ activeItem: "rooms" })}
          />
          <MenuItem
            name="rating"
            active={activeItem === "rating"}
            onClick={() => this.setState({ activeItem: "rating" })}
          /> {/* Add Rating menu item */}
          <MenuItem
            name="exams"
            active={activeItem === "exams"}
            onClick={() => this.setState({ activeItem: "exams" })}
          />
          <MenuItem
            name="progress" // Nueva opción en el menú
            active={activeItem === "progress"}
            onClick={() => this.setState({ activeItem: "progress" })}
          />
           <MenuItem
            name="study guides"
            active={activeItem === "study guides"}
            onClick={() => this.setState({ activeItem: "study guides" })}
          />
          
          <Menu.Menu position="right">
            {user ? (
              <MenuItem
                name="logout"
                active={activeItem === "logout"}
                onClick={() =>
                  this.setState({ activeItem: "logout", user: null, userRooms: [] })
                }
              />
              
            ) : (
              
              <MenuItem
                name="login"
                active={activeItem === "login"}
                onClick={this.handleLogin}
              />
            )}
          </Menu.Menu>
        </Menu>

        <Container className="main-container">
          {activeItem === "home" && user && (
            <UserProfile user={user} onLogout={this.handleLogout} />
          )}
          {activeItem === "progress" && ( // Renderizar el componente ProgressGraph
            <Segment>
              <Header as="h3">Progreso en los Exámenes</Header>
              <ProgressGraph />
            </Segment>
          )}
         {activeItem === "exams" && (
  <>
    <Exams openExam={this.openExam} />
    {/* Opciones de semestres solo para el apartado de Exams */}
    {selectedExamBG && (
      <Segment>
        <Header as="h3">Selecciona un Semestre para BG</Header>
        <Button onClick={() => this.selectExamBGSemester("Primer Semestre BG")}>
          Primer Semestre
        </Button>
        <Button onClick={() => this.selectExamBGSemester("Segundo Semestre BG")}>
          Segundo Semestre
        </Button>
        <Button onClick={() => this.selectExamBGSemester("Tercer Semestre BG")}>
          Tercer Semestre
        </Button>
        <Button onClick={() => this.selectExamBGSemester("Cuarto Semestre BG")}>
          Cuarto Semestre
        </Button>
        <Button onClick={() => this.selectExamBGSemester("Quinto Semestre BG")}>
          Quinto Semestre
        </Button>
        <Button onClick={() => this.selectExamBGSemester("Sexto Semestre BG")}>
          Sexto Semestre
        </Button>
      </Segment>
    )}

    {selectedExamBTDS && (
      <Segment>
        <Header as="h3">Selecciona un Semestre para BTDS</Header>
        <Button onClick={() => this.selectExamBTDSSemester("Primer Semestre BTDS")}>
          Primer Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDSSemester("Segundo Semestre BTDS")}>
          Segundo Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDSSemester("Tercer Semestre BTDS")}>
          Tercer Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDSSemester("Cuarto Semestre BTDS")}>
          Cuarto Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDSSemester("Quinto Semestre BTDS")}>
          Quinto Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDSSemester("Sexto Semestre BTDS")}>
          Sexto Semestre
        </Button>
      </Segment>
    )}

    {selectedExamBTDI && (
      <Segment>
        <Header as="h3">Selecciona un Semestre para BTDI</Header>
        <Button onClick={() => this.selectExamBTDISemester("Primer Semestre BTDI")}>
          Primer Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDISemester("Segundo Semestre BTDI")}>
          Segundo Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDISemester("Tercer Semestre BTDI")}>
          Tercer Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDISemester("Cuarto Semestre BTDI")}>
          Cuarto Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDISemester("Quinto Semestre BTDI")}>
          Quinto Semestre
        </Button>
        <Button onClick={() => this.selectExamBTDISemester("Sexto Semestre BTDI")}>
          Sexto Semestre
        </Button>
      </Segment>
    )}
  </>
)}

{activeItem === "examBG" && <ExamBG goToExams={this.goToExams}/>}
{activeItem === "examBG2" && <ExamBG2 goToExams={this.goToExams}/>}
{activeItem === "examBG3" && <ExamBG3 goToExams={this.goToExams}/>}
{activeItem === "examBG4" && <ExamBG4 goToExams={this.goToExams}/>}
{activeItem === "examBG5" && <ExamBG5 goToExams={this.goToExams}/>}
{activeItem === "examBG6" && <ExamBG6 goToExams={this.goToExams}/>}
{activeItem === "examBTDI" && <ExamBTDI goToExams={this.goToExams}/>}
{activeItem === "examBTDI2" && <ExamBTDI2 goToExams={this.goToExams}/>}
{activeItem === "examBTDI3" && <ExamBTDI3 goToExams={this.goToExams}/>}
{activeItem === "examBTDI4" && <ExamBTDI4 goToExams={this.goToExams}/>}
{activeItem === "examBTDI5" && <ExamBTDI5 goToExams={this.goToExams}/>}
{activeItem === "examBTDI6" && <ExamBTDI6 goToExams={this.goToExams}/>}
{activeItem === "examBTDS" && <ExamBTDS goToExams={this.goToExams}/>}
{activeItem === "examBTDS2" && <ExamBTDS2 goToExams={this.goToExams}/>}
{activeItem === "examBTDS3" && <ExamBTDS3 goToExams={this.goToExams}/>}
{activeItem === "examBTDS4" && <ExamBTDS4 goToExams={this.goToExams}/>}
{activeItem === "examBTDS5" && <ExamBTDS5 goToExams={this.goToExams}/>}
{activeItem === "examBTDS6" && <ExamBTDS6 goToExams={this.goToExams}/>}

{activeItem === "study guides" && <StudyGuides />}
          {activeItem === "messages" && (
            <Segment>
              <Header as="h3">Mensajes</Header>
              <div className="chat-container">
                <div className="messages-sidebar">
                  <Messages
                    userId={user ? user.id : null}
                    role={user ? user.role : null}
                    onSelectRoom={this.openChat}
                    rooms={userRooms}
                  />
                </div>
                <div className="chat-area">
                  {currentRoom && (
                    <Chat
                      socket={this.socket}
                      roomId={currentRoom}
                      messages={messages}
                      sendMessage={this.sendMessage}
                      user={user} // Pasamos el usuario al componente Chat
                    />
                  )}
                </div>
              </div>
            </Segment>
          )}
          {activeItem === "rating" && (
            <RatingSection rooms={rooms} user={user} /> // Render the RatingSection component
          )}
          {activeItem === "rooms" && (
            <Segment>
              <Header as="h3">Salas de Chat</Header>
              {user && (
                <Button onClick={this.createChatRoom} primary>
                  <Icon name="plus" /> Crear Sala de Chat
                </Button>
              )}
             <div>
        <h3>Buscar Salas</h3>
        {/* Componente SearchBar */}
<SearchBar 
  searchQuery={this.state.searchQuery}
  setSearchQuery={(query) => this.setState({ searchQuery: query })}
/>
        {/* Visualización del estado para pruebas */}
        <p>Resultados para: {this.state.searchQuery}</p>
      </div>
      <Grid columns={3} stackable>
  {filteredRooms.length > 0 ? (
    filteredRooms.map((room) => (
      <Grid.Column key={room.id}>
        <div className="room-card">
          {/* Barra superior con rayas */}
          <div className="card-header-bar"></div>
          <div className="content">
            <div className="card-header-title">{`Sala ${room.name}`}</div>
            <div className="card-meta">{room.description}</div>
            <img
              src={room.image_url || "https://via.placeholder.com/150"}
              alt="Foto de la sala"
            />
          </div>
          <div className="content">
            <button
              className="join-room-button"
              onClick={() => this.joinChatRoom(room)}
            >
              UNIRSE A SALA DE CHAT
            </button>
          </div>
        </div>
      </Grid.Column>
    ))
  ) : rooms.length > 0 ? (
    <Grid.Column width={16}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No se encontraron salas que coincidan con tu búsqueda.
      </div>
    </Grid.Column>
  ) : (
    <Grid.Column width={16}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No hay salas disponibles.
      </div>
    </Grid.Column>
  )}
</Grid>
            </Segment>
          )}
        </Container>
      </div>
    );
  }
}

export default App;