import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {
  @track height = '';
  @track weight = '';
  @track showResult = false;
  @track bmiValue = 0;
  @track bmiCategory = '';
  @track errorMessage = '';

  handleInputChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  calculateBMI() {
    if (!this.height || !this.weight) {
      this.errorMessage = 'Please enter a valid value';
      this.showResult = false;
      return;
    }

    const heightInMeters = this.height / 100;
    this.bmiValue = (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
    this.bmiCategory = this.getBmiCategory(this.bmiValue);
    this.showResult = true;
    this.errorMessage = '';
    this.clearInputFields();
  }

  clearInputFields() {
    this.height = '';
    this.weight = '';
  }

  getBmiCategory(bmiValue) {
   
    if (bmiValue < 18.5) {
      return 'You are very underweight and possibly malnourished.';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      return 'You have healthy weight range for young and middle-aged adults';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return 'You are overweight.';
    } else {
      return 'Obese';
    }
  }
}
