import type { Endpoint, PayloadHandler } from "payload";

const createCourse: Endpoint = {
  path: "/create-course",
  method: "post",
  handler: async (req: any, res: any, next: any) => {
    try {
      const { title="dsf", description="dsf" } = req.body;

      

      if (!title) {
        return Response.json({ success: false, message: `Title is required ${title}` });
      }

      const course = await req.payload.create({
        collection: "courses", // your collection name
        data: {
          title,
          description,
        },
      });

      return Response.json({ success: true, data: course });
    } catch (error) {
      console.error(error);
      Response.json({ success: false, message: "Server error" });
    }
  },
};

export default createCourse;
