import { title } from "process";

const userManagement = {
  title: "User Management",
  filters: {
    filterBy: "Filter By",
  },
  table: {
    columns: {
      title: {
        firstName: "First Name",
        lastName: "Last Name",
        fullName: "Full Name",
        email: "Email",
        lastLogin: "Last Login",
        status: "Status",
        actions: "Actions",
        viewaction: "View details",
        editaction: "Edit",
        deleteaction: "Delete",
        resendInviteaction: "Resend invite",
      },
      status: {
        active: "Active",
        inactive: "Inactive",
        pending: "Pending",
      },
    },
  },
  tabs: {
    investor: "Investor",
    agent: "Agent",
  },
  placeholders: {
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email",
    typeToSearch: "Type to search",
    noMatches: "No matches",
    investor: "Search By Investor Name",
    agent: "Search By Agent Name",
    search: "Search by investor name",
  },
  a11y: {
    edit: "Edit",
  },
  modal: {
    create: {
      title: "Add Investor",
    },
    edit: {
      title: "Edit Investor",
    },
  },
  confirmDelete: {
    title: "Delete",
    description: "Are you sure you want to delete this {role}?.",
    cancel: "No, Keep It",
    delete: "Yes, Delete",
  },
  validation: {
    firstName: {
      required: "First name is required",
      max: "First name cannot be more than 80 characters",
      letters: "First name can only contain letters",
      noNumbers: "First name cannot contain numbers",
      noSpecialChars: "First name cannot contain special characters",
    },
    lastName: {
      required: "Last name is required",
      max: "Last name cannot be more than 80 characters",
      letters: "Last name can only contain letters",
      noNumbers: "Last name cannot contain numbers",
      noSpecialChars: "Last name cannot contain special characters",
    },
    email: {
      required: "Email is required",
      inValidMail: "Please enter a valid email address",
      space: "Email cannot contain spaces",
    },
  },
  button: {
    addInvestor: "Add Investor",
    addAgent: "Add Agent",

    saveSendLink: "Save & Close",
    updateSendLink: "Update & Send Activation Link",
    save: "Save",
  },
  details: {
    back: "Go Back",
  },
  profile: {
    title: "Complete Your Profile",
  },
};

export default { userManagement };
