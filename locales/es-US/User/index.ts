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
    saveAgentProfile: "Save Profile",
    steps: {
      investmentBudget: "Investment Budget",
      primaryInvestmentObjective: "Primary Investment Objective",
      propertyPreferences: {
        title: "Property Preferences",
        preferredPropertyTypes: "Preferred Property Types",
        ownershipStructure: "Ownership Structure",
        ownershipStructurePlaceholder: "Select Ownership Structure",
        preferredPropertyTypesPlaceholder: "Select Property Types",
      },
      preferredRegions: {
        title: "Preferred Regions",
        countryPlaceholder: "Select Country",
        statePlaceholder: "Select State",
        cityPlaceholder: "Select City",
      },
    },
    investorProfile: {
      budget_unit: "Budget unit is required",
      budget_min: "Minimum Budget is required",
      budget_min_greater: "Must be greater than zero",
      budget_min_exceed: "Minimum cannot exceed 500 Crores",
      budget_max: "Maximum Budget is required",
      budget_max_greater: "Must be greater than zero",
      budget_max_exceed: "Minimum cannot exceed 500 Crores",
      budget_max_greater_equal:
        "Maximum must be greater than or equal to Minimum",
      risk_tolerance: "Risk Tolerance is required",
      investment_horizon: "Investment Horizon is required",
      primary_objective: "Primary Objective is required",
      ownership_structure: "Ownership Structure is required",
      preferred_regions: "Preferred Regions is required",
      preferred_property_types: "Preferred Property Types is required",
      tourism_preferences: "Tourism Preferences is required",
      renovation_willingness: "Renovation willingness is required",
      country: "Country is required",
      state: "State is required",
      city: "City is required",
    },
    agentProfile: {
      license_number: "License number is required",
      license_number_min: "License number must be at least 5 characters long",
      license_number_max: "License number must not exceed 20 characters",

      contact_number: "Contact number is required",
      contact_number_min: "Contact number must be at least 10 digits long",
      contact_number_max: "Contact number must not exceed 20 digits",

      company_name: "Company name is required",
      company_name_min: "Company name must be at least 3 characters long",
      company_name_max: "Company name must not exceed 50 characters",
    },
  },
};

export default { userManagement };
