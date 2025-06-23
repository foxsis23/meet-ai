'use client'

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {authClient} from "@/lib/auth-client";

export default function Home() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const {data:session} = authClient.useSession()

    const onSubmit = () =>{
        authClient.signUp.email({
            email,
            name,
            password
        },{
            onError:() =>{
                window.alert("error")
            }
        })
    }

    if(session){
       return (
           <div>
               <p>Logged in as {session.user.name}</p>
               <Button onClick={() => authClient.signOut()}>Sign out</Button>
           </div>
       )
    }

  return (
      <div className="p-4 flex flex-col gap-4">
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} value={name} />
          <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Button onClick={onSubmit}>
              Create user
          </Button>
      </div>
  );
}
