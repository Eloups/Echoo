import { APIRequestPlayground } from "@/components/api-requests-playground";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserInfos } from "@/components/user-infos";

export default function Home() {
  return (
    <div className="container mx-auto py-24 grid grid-cols-2 gap-12 max-w-4xl">
      {/* Inscription */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono font-light">01. Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>

      {/* Connexion */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono font-light">02. Login In</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      {/* User infos */}
      <Card className="col-span-2 max-w-none">
        <CardHeader>
          <CardTitle className="font-mono font-light">03. User session informations</CardTitle>
          <CardDescription className="prose">
            <p>
              To verify JWT infos, go to<a href="https://www.jwt.io/" target="_blank">www.jwt.io</a>{' '}
              then :
            </p>
            <ol>
              <li>Paste <code>JWT Token</code> value inside the left field named <code>JSON WEB TOKEN (JWT)</code></li>
              <li>At the bottom of the page, find <code>JWT SIGNATURE VERIFICATION</code> section and choose "<code>JWK</code>" from the select input named <code>Public Key Format</code> then fill out the text area with the JSON object retrieved from the <code>JWK</code> field</li>
            </ol>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserInfos />
        </CardContent>
      </Card>

      {/* Make authenticated requests */}
      <Card className="col-span-2 max-w-none">
        <CardHeader>
          <CardTitle className="font-mono font-light">04. Make authenticated requests </CardTitle>
          <CardDescription className="prose">
            Use the JWT generated from the client to interact with PHP API through authenticated requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <APIRequestPlayground />
        </CardContent>
      </Card>

    </div>
  );
}
