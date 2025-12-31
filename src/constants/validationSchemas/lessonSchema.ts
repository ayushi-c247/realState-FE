"use client";
import * as yup from "yup";

// Step 1 Yup schema - Updated for new flow
export const formSchema = yup.object({
  cluster: yup.string().required("Cluster is required"),
  module: yup.string().required("Module is required"),
  age: yup.string().required("Age group is required"),
  userType: yup.string().required("User type is required"),
  lesson_name: yup.string().required("Lesson is required").max(256, "Lesson name must be 256 characters or less"),
  lesson_summary: yup.string().optional(),
  image_url: yup.string().nullable().optional(),
  // lessonType removed as per new requirements
}).required();

export const editLessonSchema = yup.object({
  cluster: yup.string().required("Cluster is required"),
  module: yup.string().required("Module is required"),
  age: yup.string().required("Age group is required"),
  userType: yup.string().required("User type is required"),
  lesson_name: yup.string().required("Lesson name is required").max(256, "Lesson name must be 256 characters or less"),
  lesson_summary: yup.string().optional(),
  image_url: yup.string().nullable().optional(),
}).required();

// Step 2 Content schema - All sections are optional
export const step2ContentSchema = yup.object().shape({
  read: yup.string().optional().default(""),
  watch: yup.string().optional().default(""),
  practical: yup.string().optional().default(""),
  reflection: yup.string().optional().default(""),
  resources: yup.string().optional().default(""),
  content_status: yup.string().nullable().optional().default(null),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
export type EditLessonSchemaType = yup.InferType<typeof editLessonSchema>;
export type Step2ContentSchemaType = yup.InferType<typeof step2ContentSchema>;
