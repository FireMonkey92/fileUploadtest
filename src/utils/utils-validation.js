import * as Yup from 'yup'

const OTPRegex = /^(\s*\d{6}\s*)$/
const MobileIndependentRegex = /^[6-9]\d{9}$/

const PROFILE_IMAGE_SIZE = 1000;
const FILE_UPLOAD_SIZE = 3000;

export const loginFormValidationSchema = Yup.object().shape({
  mobile: Yup.string().trim()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  otp: Yup.string().trim().matches(OTPRegex, 'OTP Should be 6 digit number only')
})
export const OTPFormValid = Yup.object().shape({
  otp: Yup.string().trim().matches(OTPRegex, 'OTP Should be 6 digit number only')
})
export const SignInNewValidation = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  otp: Yup.string().matches(OTPRegex, 'OTP Should be 6 digit number only')
})
export const SignInNewValidationWithOTP = Yup.object().shape({
  mobile: Yup.string().trim()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  otp: Yup.string().trim().matches(OTPRegex, 'OTP Should be 6 digit number only').required('OTP is required')
})

export const forgotFormValidationSchema = Yup.object().shape({
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is Required')
})
const NameIndependentRegex = /^[A-Za-z ]+$/
const PanIndependentRegex = /^([a-zA-Z]){3}([a-cA-Cf-hF-HljptLJPT]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
const AadharIndependentRegex = /^[0-9]{12}$/

export const IndependentFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is Required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country Name is required'),
  city: Yup.string().required('City Name is required'),
  state: Yup.string().required('State Name is required'),
  address: Yup.string().trim().required('Address is required'),
  pan: Yup.string().trim()
    .required('PAN Number is required')
    .matches(PanIndependentRegex, 'PAN is not valid'),
  aadhaar: Yup.string().trim()
    .required('Aadhar is required')
    .matches(AadharIndependentRegex, 'Aadhar is not valid'),
  mobile: Yup.string().trim()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  dateofbirth: Yup.string().required('Date of Birth is required').nullable(),
  education: Yup.string().required('Education is required'),
  // date: Yup.string().required('DOB is required'),
  // month: Yup.string().required('Month is required'),
  // year: Yup.string().required('Year is required'),
  certificate: Yup.mixed().required('Certificate is required')
    .test(
      "fileSize",
      "File should be less than 3Mb size",
      value => {
        if (value) {
          if (value.base64url) {
            const base64String = value.base64url;
            var stringLength = base64String.length - 'data:application/pdf;base64,'.length;
            var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            var sizeInKb = sizeInBytes / 1000
            return value && sizeInKb <= FILE_UPLOAD_SIZE
          }
          else
            return false
        }
        else {
          return false
        }
      }
    ),
  workyears: Yup.string().required('Work Year is required'),
  // workmonth: Yup.string().required('Work Month is required'),
  services: Yup.array()
    .min(1, 'Pick at least 1 service')
    .max(10, 'Please select only 10 services')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  about: Yup.string().trim().required('About Field is required'),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required()
})
export const IndependentFormValidationSchemaUpdate = Yup.object().shape({
  avatar: Yup.mixed()
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is Required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  country: Yup.string().required('Country Name is required'),
  city: Yup.string().required('City Name is required'),
  state: Yup.string().required('State Name is required'),
  address: Yup.string().trim().required('Address is required'),
  // date: Yup.string().required('DOB is required'),
  // month: Yup.string().required('Month is required'),
  // year: Yup.string().required('Year is required'),
  workyears: Yup.string().required('Work Year is required'),
  about: Yup.string().trim().required('About Field is required')
})

const GSTOrganisationRegex = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
const TANOrganisationRegex = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/
const TELEPHONEOrgRegex = /^([0]){1}([0-9]){10}?$/
export const OrganizationFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    ),
  oname: Yup.string().trim()
    .required('Organization name is required')
    .matches(NameIndependentRegex, 'Organization name is not Valid'),
  cname: Yup.string().trim()
    .required('Company name is required')
    .matches(NameIndependentRegex, 'Company name is not Valid'),
  oemail: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  address: Yup.string().trim().required('Address is required'),
  gst: Yup.string().trim()
    .required('GST no. is required')
    .matches(GSTOrganisationRegex, 'GST no. is not valid'),
  tan: Yup.string().trim()
    .required('Tan no. is required')
    .matches(TANOrganisationRegex, 'Tan no. is not valid'),
  telephone: Yup.string().trim()
    .required('Phone number is required')
    .matches(MobileIndependentRegex, 'Phone number is not valid'),
  phone: Yup.string().trim()
    .required('Phone number is required')
    .matches(MobileIndependentRegex, 'Phone number is not valid'),
  startyear: Yup.string().required('Start year is required'),
  totalmember: Yup.number().required('Total members is required'),
  services: Yup.array()
    .min(1, 'Pick at least 1 service')
    .max(10, 'Please select only 10 services')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  about: Yup.string().trim().required('About Field is required'),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required()
})

export const OrganizationFormUpdateValidationSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    ),
  oname: Yup.string().trim()
    .required('Organization name is required')
    .matches(NameIndependentRegex, 'Organization name is not Valid'),
  cname: Yup.string().trim()
    .required('Company name is required')
    .matches(NameIndependentRegex, 'Company name is not Valid'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  address: Yup.string().required('Address is required'),
  startyear: Yup.string().required('Start year is required'),
  totalmember: Yup.number().required('Total members is required'),
  about: Yup.string().trim().required('About Field is required')
})


export const UserProfileUpdateForm = Yup.object().shape({
  avatar: Yup.mixed()
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    )
})

export const UserSignupFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed().required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 1Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  mobile: Yup.string().trim()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  dateofbirth: Yup.string().required('Date of Birth is required').nullable(),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required('Please accept Terms and Conditions'),
  gender: Yup.string().required('Gender is required'),

})

export const PasswordFormValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().trim().required('Old Password is required'),
  newPassword: Yup.string().trim().required('New Password is required'),
  reenterPassword: Yup.string().trim().required('Re-Enter New Password is required')
})

export const UserCreateJobSelectService = Yup.object().shape({
  serviceId: Yup.string().required('Service is required'),
  count: Yup.number().required('Count is required'),
  description: Yup.string().trim().required('Notes is required')
})

export const UserCreateJobBillingContact = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  service: Yup.string().trim().required('Service is required'),
  count: Yup.number().required('Count is required'),
  phone: Yup.string('Not a valid Number').trim().required('Phone Number is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  address: Yup.string().trim().required('Address is required'),
  country: Yup.string().trim().required('Country is required'),
  city: Yup.string().required('City is required')
})

export const UserCreateJobPaymentForm = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  cardno: Yup.number().required('CardNumber is required'),
  cvv: Yup.number().required('CVV is required'),
  expDate: Yup.string().required('Date is required'),
  agree: Yup.bool().oneOf([true], 'Field must be checked')
})

const DateRegex = /^(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/
const NameRegex = /^[A-Za-z]|[]+$/
const IFSCRegex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/
const AccNoRegex = /^\d{9,18}$/
export const PaymentForm = Yup.object().shape({
  ifsc: Yup.string().trim()
    .required('IFSC code is required')
    .matches(IFSCRegex, 'Invalid IFSC code'),
  accountNumber: Yup.string().trim()
    .required('Account Number is required')
    .matches(AccNoRegex, "This is doesn't look like an account number"),
  accountName: Yup.string().trim()
    .required('Name is required')
    .typeError('This is not a valid Name')
    .matches(NameRegex, 'Name is not Valid'),
  bankName: Yup.string().trim().required('Bank Name is required')
})

export const AdminSettingsQualification = Yup.object().shape({
  name: Yup.string().required('Qualification Name is required'),
  description: Yup.string().required('Qualification full name is required').nullable()
})

export const AdminSettingsServices = Yup.object().shape({
  name: Yup.string().trim().required('Service name is required'),
  description: Yup.string().trim().required('Service description is required').nullable()
})

export const AdminSettingsState = Yup.object().shape({
  name: Yup.string().trim().required('State Name is required'),
  description: Yup.string().trim().required('State description is required').nullable(),
  countryId: Yup.string().required('Country is required')
})

export const AdminSettingsCity = Yup.object().shape({
  name: Yup.string().trim().required('City name is required'),
  description: Yup.string().trim().required('City description is required').nullable(),
  countryId: Yup.string().required('Please select country'),
  stateId: Yup.string().required('Please select state')
})

const RatingRegex = /^[1-5]{1}$/
export const feedbackAndReviewForm = Yup.object().shape({
  ratings: Yup.string().matches(RatingRegex, 'Please give ratings')
    .required('Please give ratings'),
  reviews: Yup.string().trim().required('Please write review')
})
