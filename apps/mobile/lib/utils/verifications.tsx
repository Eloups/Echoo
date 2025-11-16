


// Critères :
// - Au moins un caractère avant le @ (pas espace, tab, ...)
// - Contien un @
// - Au moins un caractère entre le @ et le . (pas espace, tab, ...)
// - Contien un . au moins (j'ai découvert que dans des domaines on peut avoir plusieurs . )
// - Au moins un caractère après le dernier . (pas espace, tab, ...)
export function verifEmail(email: string): string {
    return "";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
        return "Email non valide";
    }
    return "";
}

// Critères :
// - Entre 3 et 20 caractères
// - si espaces, tab, avent ou apprer => return "espace" pour les enlever
export function verifPseudo(pseudo: string): string {
    const regex = /^(?!.*(.)\1{2,})[a-zA-Z0-9_\-À-ÖØ-öø-ÿ]{3,20}$/;
    if (!regex.test(pseudo)) {
        var messageError: string = "erreur dans le mot de passe";
        // var messageError: string = "Le mot de passe doit contenir :\n";

        return messageError;
    }
    return "";
}

// Critères :
// - Entre 12 et 30 caractères
// - Au moins une lettre majuscule
// - Au moins une lettre minuscule
// - Au moins un chiffre
// - Au moins un caractère spécial
export function verifMdp(mdp: string, mdpConf: string): string {
    if (mdp !== mdpConf) {
        return "Mot de passe non valide (mdp et mdpConf differents)";
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,30}$/;
    if (!regex.test(mdp)) {
        var messageError: string = "Le mot de passe doit contenir :\n";

        const regexLength = /^.{12,30}$/;
        const regexMaj = /[A-Z]/;
        const regexLower = /[a-z]/;
        const regexDigit = /\d/;
        const regexSpecial = /[^A-Za-z0-9]/;

        if (!regexLength.test(mdp)) { messageError += "- Entre 12 et 30 caractères\n"; }
        if (!regexMaj.test(mdp)) { messageError += "- Au moins une lettre majuscule\n"; }
        if (!regexLower.test(mdp)) { messageError += "- Au moins une lettre minuscule\n"; }
        if (!regexDigit.test(mdp)) { messageError += "- Au moins un chiffre\n"; }
        if (!regexSpecial.test(mdp)) { messageError += "- Au moins un caractère spécial\n"; }

        return messageError;
    };
    return "";
}