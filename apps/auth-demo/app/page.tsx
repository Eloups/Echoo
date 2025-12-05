"use client";

import { useCallback, useState } from "react";
import { auth } from "./auth-client";



export default function Home() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");

  const handleSubmit = useCallback(() => {
    auth.signUp.email({
      "name": "John Doe",
      "email": email, 
      "password": password,
    }).then(response => console.log("Enregistré", response));
  }, []);




  return (
    <div className="">
      <main className="">
        
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button onClick={handleSubmit}>S'inscrire</button>
        </form>

        <button onClick={async () => {
          const token = `eyJhbGciOiJFZERTQSIsImtpZCI6IlNzUUIzMllSeWZjZXZBdUpacmRjZWlQSkRSejUxMU85In0.eyJpYXQiOjE3NjQ4OTkwNzUsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJpbWFnZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0xMi0wNVQwMToyNDoxNS4wNDJaIiwidXBkYXRlZEF0IjoiMjAyNS0xMi0wNVQwMToyNDoxNS4wNDJaIiwiaWQiOiIyTUw3Uk9tRW9yR1BZdTk3NTJySTJWalR6RjNFMmxZNSIsInN1YiI6IjJNTDdST21Fb3JHUFl1OTc1MnJJMlZqVHpGM0UybFk1IiwiZXhwIjoxNzY0ODk5OTc1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMzMzMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMzMzMifQ.4Lp78zj6LHFizugwJ8W1bEYl38DaclNkNLqYEcZIZOqWQ_Fqmclken2PIVa0HdhUlainAartFz74ckBfz4a8DA`

          const response = await auth.listSessions({
             fetchOptions: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
          });
          console.log(response);
        }}>
          Qui suis-je ?
        </button>
      </main>
    </div>
  );
}
