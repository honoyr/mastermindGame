import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogData} from "../../service/message.service";


@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
