import { z } from "zod";
import { slugRegEx } from "../helper";
import { ACCEPTED_IMAGE_TYPES, YT_VIDEOS_LENGTH } from "../constants";

export const slugValidation = z
  .string()
  .nonempty("Slug is required")
  .regex(slugRegEx, "Slug must be URL-friendly, Change title.");

const picturesSchema =
  typeof window === "undefined"
    ? z.any()
    : z
        .instanceof(FileList, { message: "Pictures are required" })
        .transform((list) => Array.from(list))
        .refine(
          (files) => {
            return files.every(
              (file) => ACCEPTED_IMAGE_TYPES.indexOf(file.type) > -1
            );
          },
          {
            message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
          }
        );

export const specificationsSchema = z.object({
  label: z.string().nonempty("Key Specification label is required"),
  value: z.string().nonempty("Key Specification value is required"),
});

export const faqsSchema = z.object({
  question: z.string().nonempty("Question is required"),
  answer: z.string().nonempty("Answer is required"),
});

export const tagSchema = z.object({
  label: z.string().nonempty("Tag label is required"),
  value: z.string().nonempty("Tag value is required"),
});

export const addPlantSchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    slug: slugValidation,
    summary: z.string().nonempty("Plant summary is required"),
    category: z.string().nonempty("Plant Category is required"),
    size: z.string().nonempty("Plant Size is required"),
    careLevel: z.string().optional(),
    tags: z.array(tagSchema).optional(),
    metaDescription: z.string().optional(),
    details: z.string().nonempty("Detail is required"),
    description: z.string().nonempty("Plant description is required"),
    specifications: z.array(specificationsSchema),
    faqs: z.array(faqsSchema),
    pictures: picturesSchema,
    status: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const editPlantPicturesSchema =
  typeof window === "undefined"
    ? z.any()
    : z.union([
        z.array(z.string()),
        z
          .instanceof(FileList, { message: "Pictures are required" })
          .transform((list) => Array.from(list))
          .refine(
            (files) =>
              files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            {
              message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
            }
          ),
      ]);

export const editPlantSchema = addPlantSchema
  .extend({
    plantId: z.string(),
    pictures: editPlantPicturesSchema,
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const TagsSchema = z.object({
  label: z.string().nonempty("Tag label is required"),
});

export const homeCardSchema = z.object({
  small: z.string().nonempty("Sub-heading is required"),
  smallColor: z.string().nonempty("Sub-heading color is required"),
  large: z.string().nonempty("Heading is required"),
  largeColor: z.string().nonempty("Heading color is required"),
  link: z.object({
    label: z.string().nonempty("Link label is required"),
    address: z.string().nonempty("Link address is required"),
    color: z.string().nonempty("Link color is required"),
  }),
  picture: z.union([z.string(), z.instanceof(File), z.null(), z.undefined()]),
});

export const videoSchema = z.object({
  videos: z
    .array(z.string().url("Enter a valid YouTube URL"))
    .length(YT_VIDEOS_LENGTH),
});

export const PlantFilterSchema = z.object({
  title: z.string().optional(),
  plantId: z.string().optional(),
  status: z.string().optional(),
});

export const testimonialSchema = z.object({
  author: z.string().nonempty("Author name is required"),
  content: z.string().nonempty("Testimonial content is required"),
  rating: z
    .string()
    .nonempty("Rating is required")
    .refine(
      (val) => ["1", "2", "3", "4", "5"].includes(val),
      "Rating must be between 1 and 5"
    ),
  link: z.string().url("Must be a valid URL").optional(),
  status: z.boolean(),
});

const baseBlogSchema = {
  title: z.string().nonempty("Title is required"),
  slug: slugValidation,
  excerpt: z
    .string()
    .nonempty("Excerpt is required")
    .max(300, "Excerpt must be less than 300 characters"),
  content: z.string().nonempty("Content is required"),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z
    .string()
    .max(60, "Meta title must be less than 60 characters")
    .optional(),
  metaDescription: z
    .string()
    .max(160, "Meta description must be less than 160 characters")
    .optional(),
  readingTime: z
    .number()
    .min(1, "Reading time must be at least 1 minute")
    .optional(),
  featured: z.boolean().optional(),
  status: z.enum(["0", "1"]).optional(),
};

export const addBlogSchema = z
  .object({
    ...baseBlogSchema,
    coverImage: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Cover image is required",
      })
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes((file as File)?.type || ""),
        {
          message: ".jpg, .jpeg, .png and .webp files are accepted",
        }
      ),
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const editBlogSchema = z
  .object({
    blogId: z.string().nonempty("Blog ID is required"),
    ...baseBlogSchema,
    coverImage: z.union([
      z.string(),
      z.instanceof(File),
      z.null(),
      z.undefined(),
    ]),
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });
