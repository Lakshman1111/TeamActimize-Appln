
import * as Yup from "yup";
const generateValidationSchema = (fields) => {
  const validationRules = {};
  fields.forEach((field) => {
    switch (field) {
      case "name":
        validationRules.name = Yup.string()
          .test('is-not-empty', 'Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Name is too short')
          .max(50, 'Name is too long')
          .required('Name is required');
        break;
      case "email":
        validationRules.email = Yup.string()
          .email("Invalid email address format")
          .required("Email is required");
        break;
      case "mobile_number":
        validationRules.mobile_number = Yup.string()
          .required("Mobile Number is required")
          .matches(/^[6-9][0-9]{9}$/, "Invalid Mobile Number");
        break;
      case "relationship":
        validationRules.relationship = Yup.string()
          .test('is-not-empty', 'Relationship is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Relationship must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Relationship is too short')
          .max(50, 'Relationship is too long')
          .required('Relationship is required');
          
        break;
      case "address":
        validationRules.address = Yup.string()
          .min(5, "Address is Short!")
          .max(100, "Address is Long!")
          .required("Address is required");
        break;
      case "first_name":
        validationRules.first_name = Yup.string()
          .test('is-not-empty', 'First Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'First Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'First Name is too short')
          .max(50, 'First Name is too long')
          .required('First Name is required');
        break;
      case "organization_name":
        validationRules.organization_name = Yup.string()
          .test('is-not-empty', 'Organization Name  is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Organization Name  must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Organization Name  is too short')
          .max(50, 'Organization Name  is too long')
          .required('Organization Name  is required');
        break;
      case "date_of_join":
        validationRules.date_of_join = Yup
          .date()
          .required('Joining Date is required');
        break;
      case "date_of_end":
        validationRules.date_of_end = Yup
          .date()
          .required('Ending Date is required');
        break;
      case "skill_name":
        validationRules.skill_name = Yup.string()
          .test('is-not-empty', 'Skills Name  is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Skills Name  must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Skills Name  is too short')
          .max(50, 'Skills Name  is too long')
          .required('Skills Name  is required');
        break;
      case "rating":
        validationRules.rating = Yup
          .number()
          .required('Rating is required');
        break;
      case "daily_status":
        validationRules.daily_status = Yup.string()
          .required("Daily Status is required");
        break;
      case "task_progress":
        validationRules.task_progress = Yup.string()
          .required("Task Progress is required");
        break;
      case "task_name":
        validationRules.task_name = Yup.string()
          .test('is-not-empty', 'Task Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Task Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Task Name is too short')
          .max(50, 'Task Name is too long')
          .required('Task Name is required');
        break;
      case "description":
        validationRules.description = Yup.string()
          .test('is-not-empty', 'Description is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Description must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Description is too short')
          .max(50, 'Description is too long')
          .required('Description is required');
        break;
      case "total_hours":
        validationRules.total_hours = Yup.string()
          .required("Time is required")
          .matches(
            /^[0-9]{1}$/,
            "Invalid Hours"
          );
        break;
      case "worked_hours":
        validationRules.worked_hours = Yup.string()
          .required("Time is required")
          .matches(
            /^[0-9]{1}$/,
            "Invalid Hours"
          );
        break;
      case "Hours":
        validationRules.Hours = Yup
          .array()
          .required('Hours required');
        break;
      case "TaskName":
        validationRules.TaskName = Yup
          .array()
          .max(30)
          .required('Task Name is required');
        break;
      case "leave":
        validationRules.leave = Yup
          .array()
          .required("Leave type is required");
        break;
        case "leave_purpose":
          validationRules.leave_purpose = Yup.string()
            .test('is-capitalized', 'First letter must be capitalized', (value) => /^[A-Z]/.test(value)) // Check if first letter is capitalized
            .matches(/^[A-Za-z\s]+$/, { message: 'Leave purpose must contain only alphabetic characters and spaces' }) // Allow spaces
            .min(2, 'Leave purpose is too short')
            .max(50, 'Leave purpose is too long')
            .required('Leave purpose is required');
          break;
        
         
      case "start_date":
        validationRules.start_date = Yup
          .date()
          .required('Start Date is required');
        break;
      case "end_date":
        validationRules.end_date = Yup
          .date()
          .required('End Date is required');
        break;
      case "type_of_leave":
        validationRules.type_of_leave = Yup.string()
          .min(2, "Type of Leave is Short!")
          .max(50, "Type of Leave is Long!")
          .required('Type of Leave is required');

        break;
      case "number_of_leaves":
        validationRules.number_of_leaves = Yup
          .number()
          .required('Number of Leaves is required');
        break;
      // Add additional fields as needed
      default:
        break;
      case "bank_name":
        validationRules.bank_name = Yup.string()
          .min(2, "Bank Name  is Short!")
          .max(50, "Bank Name  is Long!")
          .required('Bank Name  is required');
        break;
      case "account_number":
        validationRules.account_number = Yup.string()
          .min(2, "Account Number is Short!")
          .max(50, "Account Number is Long!")
          .required('Account Number is required');
        break;
      case "ifsc_code":
        validationRules.ifsc_code = Yup.string()
          .min(2, "IFSE Code  is Short!")
          .max(50, "IFSE Code  is Long!")
          .required('IFSE Code is required');
        break;
      case "branch_name":
        validationRules.branch_name = Yup.string()
          .min(2, "Branch Name is Short!")
          .max(50, "Branch Name is Long!")
          .required('Branch Name is required');
        break;
      case "last_name":
        validationRules.last_name = Yup.string()
          .test('is-not-empty', 'Last Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Last Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Last Name is too short')
          .max(50, 'Last Name is too long')
          .required('Last Name is required');
        break;
      case "date_of_birth":
        validationRules.date_of_birth = Yup
          .date()
          .required('Birth Date is required');
        break;
      case "gender":
        validationRules.gender = Yup
          .string()
          .required("Gender is required");
        break;
      case "nationality":
        validationRules.nationality = Yup.string()
          .test('is-not-empty', 'Nationality is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Nationality must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Nationality is too short')
          .max(50, 'Nationality is too long')
          .required('Nationality is required');
        break;
      case "marital_status":
        validationRules.marital_status = Yup.string()
          .required("Marital Status is required");
        break;
      case "aadhar_card_number":
        validationRules.aadhar_card_number = Yup.string()
          .min(7, 'Aadhar Number Length should be 12 digits')
          .required("Aadhar is required")
          .matches(
            /^[0-9]{12}$/,
            "Invalid Aadhar number"
          );
        break;
      case "pan_card_number":
        validationRules.pan_card_number = Yup.string()
          .test(
            "PAN Card ",
            "PAN Card must be of length 10, eg:XXXXX1234X",
            (value) => value?.length === 10
          )
          .matches(
            /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            "First 5 are alphabets,next 4 are numbers,last is alphabet"
          )
          .required("PAN Card Is Required");
        break;
      case "mobile_number":
        validationRules.mobile_number = Yup.string()
          .required("Mobile Number is required")
          .matches(
            /^[0-9]{10}$/,
            "Invalid mobile number"
          );
        break;
      case "company_email":
        validationRules.company_email = Yup.string()
          .email("Invalid company email address format")
          .required("Company Email is required");
        break;
      case "personal_email":
        validationRules.personal_email = Yup.string()
          .email("Invalid personal email address format")
          .required("Personal Email is required");
        break;
      case "permanent_address":
        validationRules.permanent_address = Yup.string()
          .min(10, "Permanent Address is Short!")
          .max(300, "Permanent Address is Long!")
          .required('Permanent Address is required');
        break;
        case "present_address":
          validationRules.present_address = Yup.string()
            .min(10, "Current  Address is Short!")
            .max(300, "Current Address is Long!")
            .required('Current Address is required');
          break;
      case "project_name":
        validationRules.project_name = Yup.string()
          .test('is-not-empty', 'Project Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Project Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Project Name is too short')
          .max(50, 'Project Name is too long')
          .required('Project Name is required');
        break;
      case "status":
        validationRules.status = Yup.string()
          .test('is-not-empty', 'Status is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Status must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Status is too short')
          .max(50, 'Status is too long')
          .required('Status is required');
        break;
      case "start_date":
        validationRules.start_date = Yup
          .date()
          .required('Start Date is required');
        break;
      case "end_date":
        validationRules.end_date = Yup
          .date()
          .required('Ending Date is required');
        break;
      case "members":
        validationRules.members = Yup.array()
          .min(1, 'At Least One Member is required') // Ensure at least one item is selected
          .required('Members is required');
        break;
      case "title":
        validationRules.title = Yup.string()
          .test('is-not-empty', 'Holiday Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Holiday Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Holiday Name is too short')
          .max(50, 'Holiday Name is too long')
          .required('Holiday Name is required');
        break;
      case "date":
        validationRules.date = Yup.date()
          .required('Holiday Date is required');
        break;
      case "salary":
        validationRules.salary = Yup.string()
          .matches(/^\d+$/, 'Salary must contain only numbers')
          .min(1, 'Salary is too short')
          .max(50, 'Salary is too long')
          .required('Salary is required');
        break;
      case "event_name":
        validationRules.event_name = Yup.string()
          .test('is-not-empty', 'Expert name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Expert name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Expert name is too short')
          .max(50, 'Expert name is too long')
          .required('Expert name is required')
        break;
      case "event_date":
        validationRules.event_date = Yup
          .date()
          .required('Event Date is required');
        break;
      case "venue":
        validationRules.venue = Yup.string()
          .test('is-not-empty', 'Venue is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Venue must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Venue is too short')
          .max(50, 'Venue is too long')
          .required('Venue is required');
        break;
      case "view":
        validationRules.view = Yup.string()
          .test('is-not-empty', 'View is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'View must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'View is too short')
          .max(50, 'View is too long')
          .required('View is required');
        break;
      case "event_time":
  validationRules.event_time = Yup.string()
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/i,
      "Invalid time format. Please use hh:mm AM/PM format (01:00 AM to 12:59 PM)"
    )
    .required('Time is required');
  break;

      case "expert_id":
        validationRules.expert_id = Yup.string()
          .min(1, "Expert name is Short!")
          .max(50, "Expert name is Long!")
          .required('Expert Name is required');
        break;
      case "designation":
        validationRules.designation = Yup.string()
          // .test('is-capitalized', 'First letter must be capitalized', (value) => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          // .matches(/^[A-Za-z\s]+$/, { message: 'Designation must contain only alphabetic characters and spaces' }) // Allow spaces
          // .min(2, 'Designation is too short')
          // .max(50, 'Designation is too long')
          // .required('Designation is required');
          .test('is-not-empty', 'Designation is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Designation must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Designation is too short')
          .max(50, 'Designation is too long')
          .required('Designation is required');
          
        break;
      case "department":
        validationRules.department = Yup.string()
          .test('is-not-empty', 'Department is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Department must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Department is too short')
          .max(50, 'Department is too long')
          .required('Department is required');
        break;
      case "reporting_to":
        validationRules.reporting_to = Yup.string()
          .test('is-not-empty', 'Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Name is too short')
          .max(50, 'Name is too long')
          .required('Name is required');
        break;
      case "email_id":
        validationRules.email_id = Yup.string()
        .email("Invalid email address format")
        .required("Email is required");
        break;
      case "mobile_number":
        validationRules.mobile_number = Yup.string()
          .min(1, "Time is Short!")
          .max(50, "Time is Long!")
          .required('Time is required');
        break;
      case "working_location":
        validationRules.working_location = Yup.string()
          .test('is-capitalized', 'First letter must be capitalized', (value) => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Loaction must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Loaction is too short')
          .max(50, 'Loaction is too long')
          .required('Loaction is required');
        break;
      case "made_by":
        validationRules.made_by = Yup.string()
        .test('is-not-empty', 'Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
        .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
        .matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabetic characters and spaces' }) // Allow spaces
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Name is required');
      
      case "serial_number":
        validationRules.serial_number = Yup.string()
          .min(1, "Serial Number is Short!")
          .max(50, "Serial Number is Long!")
          .required('Serial Number is required');
        break;
      case "model":
        validationRules.model = Yup.string()
          .min(1, "Model Type is Short!")
          .max(50, "Model Type is Long!")
          .required('Model Type is required');
        break;
      case "color":
        validationRules.color = Yup.string()
          .test('is-capitalized', 'First letter must be capitalized', (value) => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Color must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Color is too short')
          .max(50, 'Color is too long')
          .required('Color is required');
        break;
      case "charger":
        validationRules.charger = Yup.string()
          .min(2, "Charger is Short!")
          .max(50, "Charger is Long!")
          .required('Charger is required');
        break;
      case "keyboard":
        validationRules.keyboard = Yup.string()
          .min(2, "Keyboard is Short!")
          .max(50, "Keyboard is Long!")
          .required('Keyboard is required');
        break;
      case "bag":
        validationRules.bag = Yup.string()
          .min(2, "Bag is Short!")
          .max(50, "Bag is Long!")
          .required('Bag is required');
        break;
      case "mouse":
        validationRules.mouse = Yup.string()
          .min(2, "Mouse is Short!")
          .max(50, "Mouse is Long!")
          .required('Mouse is required');
        break;
      case "employee_id":
        validationRules.employee_id = Yup.string()
          .min(2, "Employee Id  is Short!")
          .max(50, "Employee Id is Long!")
          .required('Employee Id is required');
        break;
      case "message":
        validationRules.message = Yup.string()
        .test('is-not-empty', 'Message is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
        .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
        .matches(/^[A-Za-z\s]+$/, { message: 'Message must contain only alphabetic characters and spaces' }) // Allow spaces
        .min(2, 'Message is too short')
        .max(50, 'Message is too long')
        .required('Message is required');
        break;
      case "note":
        validationRules.note = Yup.string()
          .min(2, "Note is Short!")
          .max(50, "Note is Long!")
          .required('Note is required');
        break;
      case "status":
        validationRules.status = Yup.string()
          .min(2, "Status is Short!")
          .max(50, "Status is Long!")
          .required('Status is required');
        break;
      case "exit_type":
        validationRules.exit_type = Yup.string()
        .test('is-not-empty', 'Expert Type is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
        .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
        .matches(/^[A-Za-z\s]+$/, { message: 'Expert Type must contain only alphabetic characters and spaces' }) // Allow spaces
        .min(2, 'Expert Type is too short')
        .max(50, 'Expert Type is too long')
        .required('Expert Type is required');
       
        break;
      case "start_date":
        validationRules.start_date = Yup.date()
          .required('Joining Date is required');
        break;
      case "end_date":
        validationRules.end_date = Yup.date()
          .required('Ending Date is required');
        break;
      case "appreciation_date":
        validationRules.appreciation_date = Yup.date()
          .required('Appreciation Date is required');
        break;
      case "message":
        validationRules.message = Yup.string()
          .min(3, "Address is Short!")
          .max(100, "Address is Long!")
          .required('Message is required');
        break;
      case "company_email_id":
        validationRules.company_email_id = Yup.string()
          .email('Invalid email address format')
          .required('Email is required');
        break;
      case "reason":
        validationRules.reason = Yup.string()
          .test('is-not-empty', 'Reason is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
          .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
          .matches(/^[A-Za-z\s]+$/, { message: 'Reason must contain only alphabetic characters and spaces' }) // Allow spaces
          .min(2, 'Reason is too short')
          .max(50, 'Reason is too long')
          .required('Reason is required');
        break;
      case "seviority":
        validationRules.seviority = Yup.number()
        .required('Seviority is required');
          
        break;
      case "merit_type":
        validationRules.merit_type = Yup.string()
          .min(1, "Merit type is Short!")
          .max(50, "Merit type is Long!")
          .required('Merit type is required');
        break;
      case "sick_leaves":
        validationRules.sick_leaves = Yup  .number()
        .required('Number of Sick Leaves is required');
        break;
      case "casual_leaves":
        validationRules.casual_leaves = Yup   .number()
        .required('Number of Casual Leaves is required');
        break;
      case "year":
        validationRules.year = Yup.number()
        .required('Year is required')
        .integer('Year must be an integer')
        .test(
          'len',
          'Year must be a 4-digit number',
          (val) => val && val.toString().length === 4
        );
        break;
        case "TaskName":
          validationRules.TaskName = Yup.string().required('Task Name is required');
          break;

    }
  });
  return Yup.object(validationRules);
};

const initialValues = {
  name: "",
  email: "",
  mobile_number: "",
  relationship: "",
  address: "",
  first_name: "",
  organization_name: '',
  designation: '',
  date_of_join: '',
  date_of_end: '',
  skill_name: '',
  rating: '',

  daily_status: '',
  task_progress: '',
  task_name: '',
  description: '',
  total_hours: '',
  worked_hours: '',


  Hours: '',
  TaskName: '',
  leave: '',

  leave_purpose: '',
  start_date: '',
  end_date: '',
  type_of_leave: '',
  number_of_leaves: '',
  // bankdetails

  bank_name: '',
  account_number: '',
  ifsc_code: '',
  branch_name: '',
  // personal details 

  // first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
  nationality: '',
  marital_status: '',
  aadhar_card_number: '',
  pan_card_number: '',
  mobile_number: '',
  company_email: '',
  personal_email: '',
  permanent_address: '',
  present_address: '',
  profile_pic: '',
  // expercreation
  name: '',
  username: '',
  email: '',
  roles: [],
  designation: '',
  employee_id_number: '',
  password: '',
  password_confirmation: '',

  //proficeny mangement
  expert_id: '',
  exit_type: '',
  start_date: '',
  end_date: '',

  // projects mangement
  project_name: '',
  status: '',
  start_date: '',
  end_date: '',
  members: [],
  members_list:[],

  // holidaymangement
  title: '',
  date: '',
  // payslip
  salary: '',
  //  eventsmangement
  event_name: '',
  event_date: '',
  venue: '',
  view: '',
  event_time: '',

  // gadgets 
  expert_id: '',
  employee_id: '',
  designation: '',
  department: '',
  reporting_to: '',
  email_id: '',
  mobile_number: '',
  working_location: '',
  made_by: '',
  serial_number: '',
  model: '',
  color: '',
  charger: '',
  keyboard: '',
  mouse: '',
  bag: '',

  // expert certifications
  expert_id: '',
  message: '',
  note: '',
  status: '',
  // expert reliving data
  expert_id: '',
  exit_type: '',
  start_date: '',
  end_date: '',
  // perfomance
  appreciation_date: '',
  message: '',
  // dmerits
  company_email_id: '',
  reason: '',
  seviority: '',
  merit_type: '',
  // leavebank
  sick_leaves: '',
  casual_leaves: '',
  year: '',
  //hoursentry
  TaskName:'',
};

export { initialValues, generateValidationSchema };