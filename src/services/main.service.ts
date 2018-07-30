import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class MainService {
    constructor(public afDB:AngularFireDatabase) {
    }
    /**
     * getNotes Obtiene todas las notas
     */
    public getNotes() {
        return this.afDB.list('/notes/');
    }
    /**
     * getNote Obtiene una nota especifica
     */
    public getNote(id) {
        return this.afDB.object('/notes/' + id);
    }
    /**
    * createNote Crear la nota
    */
    public createNote(note) {
        return this.afDB.database.ref('/notes/' + note.id).set(note);
    }

    /**
    * editNote Editar la nota
    */
    public editNote(note) {
        return this.afDB.database.ref('/notes/' + note.id).set(note);
    }
     /**
    * deleteNote Eliminar la nota
    */
    public deleteNote(note) {
        return this.afDB.database.ref('/notes/' + note.id).remove();
    }
}