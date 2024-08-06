import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';

import { from } from 'rxjs';
import { Route } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { CrudserviceService } from '../services/crudservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { state } from '@angular/animations';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  //imagePath: string= '';
  isUpdate:boolean = false;
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
  userId!:number;

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
    });

     this.serve.currentUserDetail.subscribe(userDetail => {
      if (userDetail) {
        this.isUpdate = true;
        this.userId = userDetail.userId;
        this.userForm.patchValue({
          
          firstName : userDetail.firstName,
          middleName : userDetail.middleName,
          lastName : userDetail.lastName,
          dateOfBirth : this.formatDate(userDetail.dob),
          email : userDetail.email,
          gender : userDetail.gender,
          phone : userDetail.phone,
          alternatePhone : userDetail.alternatePhone,
          dateOfJoining : this.formatDate(userDetail.dateOfjoining),
          country:userDetail.sAddresses[0].country,
          state:userDetail.sAddresses[0].state,
          city:userDetail.sAddresses[0].city,
          zipCode:userDetail.sAddresses[0].zipCode
      })}
    });
      
  }

  onUpdate(){
    const formData = new FormData();
  
      formData.append('userId', this.userId.toString());
      formData.append('firstName', this.userForm.get('firstName').value);
      formData.append('middleName', this.userForm.get('middleName').value);
      formData.append('lastName', this.userForm.get('lastName').value);
      formData.append('gender', this.userForm.get('gender').value);
      formData.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
      formData.append('email', this.userForm.get('email').value);
      formData.append('dateOfJoining', this.userForm.get('dateOfJoining').value);
      formData.append('phone', this.userForm.get('phone').value);
      formData.append('alternatePhone', this.userForm.get('alternatePhone').value);
      formData.append('imagePath', this.selectedImg.name);
      
     formData.append('address', '123 Lane'); 
     // You need to provide the actual address value
      formData.append('city', this.userForm.get('city').value);
      formData.append('state', this.userForm.get('state').value);
      formData.append('country', this.userForm.get('country').value);
      formData.append('zipCode', this.userForm.get('zipCode').value);

      console.log(this.userId);
    this.serve.updateUser(formData,this.userId).subscribe(res=>{
      this.toastr.success(res.result);
      console.log("response",res);
    })
  }

  private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year,month,day].join('-');
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
    if (this.userForm.valid) {
      const formData = new FormData();
  
      formData.append('userId', '0');
      formData.append('firstName', this.userForm.get('firstName').value);
      formData.append('middleName', this.userForm.get('middleName').value);
      formData.append('lastName', this.userForm.get('lastName').value);
      formData.append('gender', this.userForm.get('gender').value);
      formData.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
      formData.append('email', this.userForm.get('email').value);
      formData.append('dateOfJoining', this.userForm.get('dateOfJoining').value);
      formData.append('phone', this.userForm.get('phone').value);
      formData.append('alternatePhone', this.userForm.get('alternatePhone').value);
      formData.append('imagePath', this.selectedImg.name);
      
     formData.append('address', '123 Lane'); 
     // You need to provide the actual address value
      formData.append('city', this.userForm.get('city').value);
      formData.append('state', this.userForm.get('state').value);
      formData.append('country', this.userForm.get('country').value);
      formData.append('zipCode', this.userForm.get('zipCode').value);
  
      console.log(formData);
  
      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      });
      this.serve.addUser(formData, { headers: headers }).subscribe({
        next: (response) => {
          if (response.success) {
            // this.toastr.success(response.message, 'Successfully!');
            alert("hello")
          }
          else {
            this.toastr.error(response.message, 'Error!');
            alert("thiik kr")

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
    else {
      this.toastr.error('Please fill in all required fields', 'Error!');
    }
  }
}



