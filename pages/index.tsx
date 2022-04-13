import React, { useEffect, useState } from "react";

import api from "../api";

interface Users {
  id: 1;
  email: string;
  name: string;
  password: string;
}

function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await api.get("/users");
        setUsers(result.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  const createNewUSer = async (e: any) => {
    e.preventDefault();
    try{
        const body = {
          name,
          email,
          password
    
        }
        const response =  await api.post('/users', body)
        setUsers([...users, response.data])
        setShowModal(false)
    } catch(e){
        console.log(e)
    }
  }
  useEffect(() => {
    if(showModal){
      
      window.document.body.style.overflowY = 'hidden'
    }else {
      window.document.body.style.overflowY = 'auto'
    }
  }, [showModal])

  return (
    <div className="relative min-h-screen">
      {/* Modal */}
      {showModal && (
        <div>
          <div
            className="bg-[#00000060] h-screen w-full z-20 fixed"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="absolute bottom-0 h-[75%] w-full bg-slate-900 z-30 rounded-tl-[40px] rounded-tr-[40px]">
            <form onSubmit={(e) => createNewUSer(e)} className="px-10 mt-20 flex flex-col gap-10 h-full relative">
              <input className="w-full p-5" placeholder="Nome" type="text" onChange={(e) => setName(e.target.value)} required />
              <input className="w-full p-5" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
              <input className="w-full p-5" placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} required/>
              <button className="w-full mt-20 bg-slate-200 p-5">Salvar</button>
            </form>
          </div>
        </div>
      )}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-10/12 mx-auto h-full flex flex-col items-center justify-center gap-5 mt-10">
          {users &&
            users.map((user) => (
              <div key={user.id} className={"w-full h-20 border p-5"}>
                {user.name}
              </div>
            ))}
        </div>
        <button
          className="fixed w-full h-20 bg-slate-900 bottom-0 text-white text-xl z-10"
          onClick={() => setShowModal(true)}
        >
          Criar Novo Usuário
        </button>
      </div>
    </div>
  );
}

export default Home;
