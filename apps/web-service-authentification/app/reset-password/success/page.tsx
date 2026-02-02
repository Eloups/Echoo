import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";

export default function PageSuccessResetPassword() {

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", width: "100%" }}>
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <EchoCompleteLogo height={80} style={{ marginRight: 14 }} />
            </div>
            <div style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "start", paddingTop: 50, display: "flex" }}>
                <div style={{ padding: 30, borderRadius: 10, width: 350, backgroundColor: "#161616", alignItems: "center", display: "flex", flexDirection: "column", gap: 30 }}>
                    <p style={{fontSize: "1.5rem",  color: "#ffffff"}}>Mot de passe bien réinitialisé. Retournez à la page de connexion. Sur votre application Echoo.</p>
                </div>
            </div>
        </div>
    );
}