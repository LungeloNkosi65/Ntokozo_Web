import { Component, OnInit } from '@angular/core';
import { PrintermakeService} from '../../services/printermake.service'
import {Make} from '../../Models/PrinterMake';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-printermake',
  templateUrl: './printermake.component.html',
  styleUrls: ['./printermake.component.css']
})
export class PrintermakeComponent implements OnInit {


    makes:Make[]=[];
    singleMake:Make;
    makesForm:any;
    makeUpdate:number;
  constructor(private printerMakeService:PrintermakeService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.getAllMakes();
    this.makesForm = this.formBuilder.group({
      PrinterMake: ['', Validators.required]
    });
  }

  getAllMakes(){
    this.printerMakeService.getAllMakes().subscribe((data:any)=>{
      this.makes=data;
      console.log(this.makes);
      this.makeUpdate=null;
    });
  }




  //--------------------------------Add or Edit-----------------------------------------------------------
  addPrinterMake(make: Make) {
    if (make != undefined && make != null) {
      if (this.makeUpdate == null) {
        this.printerMakeService.addMake(make).subscribe((data: any) => {
          if (data != null) {
            this.getAllMakes();
            this.clearForm();
          }
        });
      }
      else {
        //TODO UPDATE MARKET
        make.makeId = this.makeUpdate;
        this.printerMakeService.updateMake(make).subscribe((data: any) => {
          if (data != undefined || data != null) {
            this.getAllMakes();
            this.clearForm();
            this.makeUpdate=null;
          }
        });
      }
    }
  }
  //--------------------------------Add or Edit-----------------------------------------------------------


  //----------Delete Make----------------------------------------------
  deletMake(makeId: number) {
    if (window.confirm("Are you sure you want to delete record")) {
      this.printerMakeService.deleteMake(makeId).subscribe((data: any) => {
        if (data != null || data != undefined) {
          this.getAllMakes();
        }
      });
    }
  }

  //----------Delete Make----------------------------------------------


//-----------------load form to edit-----------------------
loadFrom(makeId: number) {
  this.makeUpdate = makeId;
  this.printerMakeService.getSingleMake(makeId).subscribe((data: any) => {
    console.log('I found this', data);
    this.makesForm.controls['PrinterMake'].setValue(data.printerMake)
  });
}

//-----------------load form to edit-----------------------
  onFormSubmit() {
    const formData = this.makesForm.value;
    this.addPrinterMake(formData);
  }


  clearForm() {
    this.makesForm.reset();
  }

  setaHeading(){
    this.makeUpdate=null;
    this.clearForm();
  }


}
