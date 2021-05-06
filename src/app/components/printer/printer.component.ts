import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Printer, VPrinter } from 'src/app/Models/Printer';
import { Make } from 'src/app/Models/PrinterMake';
import { PrintermakeService } from 'src/app/services/printermake.service';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css']
})
export class PrinterComponent implements OnInit {

  printers: Printer[] = [];
  vPrinters: VPrinter[] = [];
  singlePrinter: Printer;
  printersForm: any;
  printerUpdate: number;
  selectedMake: Make;
  makes: Make[] = [];
  makeId: number;

  constructor(private printerService: PrinterService, private formBuilder: FormBuilder, private makeService: PrintermakeService) { }

  ngOnInit(): void {
    this.getAllPrinters();
    this.getPrinterMakes();
    this.selectedMake = {
      makeId: null,
      printerMake: 'Select Make'
    };
    this.printersForm = this.formBuilder.group({
      PrinterName: ['', Validators.required],
      FolderToMinitor: ['', Validators.required],
      OutPutType: ['', Validators.required],
      FileOutput: ['', Validators.required],
    });
  }

  ngAfterContentChcked() {
    this.selectedMake = {
      makeId: null,
      printerMake: 'Select Make'
    }
  }

  getAllPrinters() {
    this.printerService.getAllVPrinters().subscribe((data: any) => {
      this.vPrinters = data;
      console.log(this.vPrinters);
    });
  }


  getSinglePrinter(printerId: number) {
    this.printerService.getSinglePrinter(printerId).subscribe((data: any) => {
      this.singlePrinter = data;
    });
  }

  //----------------Get Makes from DB for dropdwon----------------------------------------------
  getPrinterMakes() {
    this.makeService.getAllMakes().subscribe((data: any) => {
      this.makes = data;
    });
  }
  //----------------Get Makes from DB for dropdwon END----------------------------------------------

  //------------------Add Printer----------------------------------------------------------------------
  addPrinter(printer: Printer) {
    console.log('UpdateId', this.printerUpdate);
    if (printer != undefined && printer != null) {
      if (this.printerUpdate == null) {
        printer.makeId = this.makeId;
        this.printerService.addPrinter(printer).subscribe((data: any) => {
          if (data != null) {
            this.getAllPrinters();
            // this.changeHeading();
          }
        });
      }
      else {
        printer.printerId = this.printerUpdate;
        printer.makeId = Number(this.makeId);
        this.printerService.updatePrinter(printer).subscribe((data: any) => {
          this.getAllPrinters();
          // this.changeHeading();
        });
      }
    }
  }

  //------------------Add Printer End----------------------------------------------------------------------


  //----------------------Delete Printer--------------------------------------------------
  deletePrinter(printerId: number) {
    if (window.confirm("Are you sure you want to delete the record")) {
      this.printerService.deletePrinter(printerId).subscribe((data: any) => {
        if (data != null) {
          this.getAllPrinters();
        }
      });
    }
  }
  //----------------------Delete Printer--------------------------------------------------

  //-----------------------Load Form To Edit------------------------------------------------
  loadPrinterToEdit(printerId: number) {
    this.printerUpdate = printerId;
    this.printerService.getSinglePrinter(printerId).subscribe((data) => {
      this.singlePrinter = data;
      this.makeId = data.makeId;
      this.printersForm.controls['PrinterName'].setValue(this.singlePrinter.printerName);
      this.printersForm.controls['FolderToMinitor'].setValue(this.singlePrinter.folderToMonitor);
      this.printersForm.controls['OutPutType'].setValue(this.singlePrinter.outPutType);
      this.printersForm.controls['FileOutput'].setValue(this.singlePrinter.fileOutput);
    });
    console.log('eventId passed ', printerId)
    //  this.eventForm.
  }
  //-----------------------Load Form To Edit------------------------------------------------



  onFormSubmit() {
    const formData = this.printersForm.value;
    this.addPrinter(formData);
  }


  getMakeId(make: any) {
    this.selectedMake = make;
    this.makeId = this.selectedMake.makeId;
    console.log('submited id', this.makeId);
  }
  clearForm() {
    this.printersForm.reset();
  }

  changeHeading() {
    this.printerUpdate = null;
    this.selectedMake = {
      printerMake: "Select Make",
      makeId: null
    };
    this.clearForm();
    //  console.log('HEading changed to ', this.eventUpdate)
  }

}
