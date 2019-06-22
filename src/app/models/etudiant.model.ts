export class Etudiant {
    id: number;
    nom: string;
    prenoms: string;
    promotion: number;
    email: string;
    password: string;
    telephone: string;
    type: string;
    entreprise: string;
    poste: string;
    constructor() {
        const date = new Date();
        this.id = -1;
        this.nom = '';
        this.prenoms = '';
        this.promotion = date.getFullYear();
        this.email = '';
        this.password = '';
        this.telephone = '';
        this.type = 'sm';
        this.entreprise = '';
        this.poste = '';
    }
}
