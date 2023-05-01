import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, map} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: AngularFireStorage, private storeUid: AngularFirestore) { }
  uploadFile(event: any) {
    const file = event.target.files[0];
    const name: string = this.storeUid.createId() + "_" + file.name;
    const filePath = `images/${name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges()
      .pipe(
        finalize(() => fileRef.getDownloadURL()),
        map(() => fileRef.getDownloadURL())
      );
  }


}
