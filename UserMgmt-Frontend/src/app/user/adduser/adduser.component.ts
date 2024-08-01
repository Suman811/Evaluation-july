import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';

import { from } from 'rxjs';
import { Route } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { CrudserviceService } from '../services/crudservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  //imagePath: string= '';
  imgSrc: string = '';
  selectedImg: any = null;
  countryCode: any;
  stateListBasedOnCountryCode: any;
  cityListBasedOnStateCode: any;
  userForm: any;
  countryList: any;
  countryData = Country.getAllCountries();
  i: any;
  // city:any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private route: Router, private serve: CrudserviceService) { }
  setCountryCode(event: any) {
    this.countryCode = event.target.value;
    this.stateListBasedOnCountryCode = State.getStatesOfCountry(this.countryCode);
  }
  setCityCode(event: any) {

  }
  setStateCode(event: any) {
    this.cityListBasedOnStateCode = City.getCitiesOfState(this.countryCode, event.target.value);
  }
  getControl(name: string) {
    return this.userForm.get(name);
  }
  // getAddressControl(,name: string) {
  //   return this.userForm.get(name);
  // }

  // getAddressControl(i: number, controlName: string): AbstractControl | null {
  //   return (this.userForm.get('Addresses') as FormArray).at(i).get(controlName);
  // }
  ngOnInit(): void {
    this.countryList = Country.getAllCountries();
    this.userForm = new FormGroup({
      
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfJoining: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      alternatePhone: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),

      // Addresses: new FormArray(
      //   [
      //   this.createAddressGroup(1) 
      // ]),
      //isActive: new FormControl(false)
    });
  }


  // createAddressGroup(addressTypeId: number): FormGroup {
  //   return new FormGroup({
  //     addressTypeId: new FormControl(addressTypeId),
  //     country: new FormControl('', [Validators.required]),
  //     state: new FormControl('', [Validators.required]),
  //     city: new FormControl('', [Validators.required]),
  //     zipCode: new FormControl('', [Validators.required])
  //   });
  // }
  // get Addresses(): FormArray {
  //   return this.userForm.get('Addresses') as FormArray;
  // }
  // addSecondaryAddress() {
  //   if (this.Addresses.length < 2) {
  //     this.Addresses.push(this.createAddressGroup(2));
  //   }
  // }

  // removeSecondaryAddress() {
  //   if (this.Addresses.length === 2) {
  //     this.Addresses.removeAt(1);
  //   }
  // }

  // onCountryChange(index: number, event : any) {
  //   const selectedCountry = this.Addresses.at(index).get('country')?.value;
  //   const states = State.getStatesOfCountry(selectedCountry);
  //   this.Addresses.at(index).get('state')?.enable();
  //   this.Addresses.at(index).get('state')?.setValue(''); 
  //   this.Addresses.at(index).get('city')?.setValue(''); 
  //   this.Addresses.at(index).get('city')?.disable();

  //   // Store the states in a local variable to use in the template
  //   this.Addresses.at(index).get('state')?.setValidators([Validators.required]);
  //   this.Addresses.at(index).get('state')?.updateValueAndValidity();
  // }

  get f() {
    return this.userForm.controls;
  }
  // onStateChange(index: number) {
  //   const selectedState = this.Addresses.at(index).get('state')?.value;
  //   const selectedCountry = this.Addresses.at(index).get('country')?.value;
  //   const cities = City.getCitiesOfState(selectedCountry, selectedState);

  //   this.Addresses.at(index).get('city')?.enable(); 
  //   this.Addresses.at(index).get('city')?.setValue(''); 
  // }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImg = file;
      this.imgSrc = URL.createObjectURL(file);
      console.log(file);
    }
  }
  onSubmit() {
    const formData = new FormData();

    console.log(this.userForm.value);

    formData.append('firstName', this.userForm.get('firstName').value);
    formData.append('middleName', this.userForm.get('middleName').value);
    formData.append('lastName', this.userForm.get('lastName').value);
    formData.append('gender', this.userForm.get('gender').value);
    formData.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('dateOfJoining', this.userForm.get('dateOfJoining').value);
    formData.append('phone', this.userForm.get('phone').value);
    formData.append('alternatePhone', this.userForm.get('alternatePhone').value);
    formData.append('country', this.userForm.get('country').value);
    formData.append('state', this.userForm.get('state').value);
    formData.append('city', this.userForm.get('city').value);
    formData.append('zipcode', this.userForm.get('zipcode').value);

    //formData.append('isActive', this.userForm.get('isActive').value);

    // this.Addresses.controls.forEach((control, index) => {
    //   const addressGroup = control as FormGroup;
    //   const addressPrefix = `Addresses[${index}]`;
    //   formData.append(`${addressPrefix}.addressTypeId`, addressGroup.get('addressTypeId')?.value);
    //   formData.append(`${addressPrefix}.country`, addressGroup.get('country')?.value);
    //   formData.append(`${addressPrefix}.state`, addressGroup.get('state')?.value);
    //   formData.append(`${addressPrefix}.city`, addressGroup.get('city')?.value);
    //   formData.append(`${addressPrefix}.zipCode`, addressGroup.get('zipCode')?.value);
    // });

    formData.append('ImagePath', this.selectedImg);


    formData.forEach((value, key) => {
      console.log(key, value);
    });

    console.log("FormData",formData)

    console.log(this.userForm.value);
    debugger
    this.serve.addUser(formData).subscribe({

      next: (response) => {
        if (response.success) {
          this.toastr.success(response.message, 'Successfully!');
        }
        else {
          this.toastr.error(response.message, 'Error!');
        }
      },

      error: (err) => {
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, 'Error!');
        }
        else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      }
    })

  }
}



