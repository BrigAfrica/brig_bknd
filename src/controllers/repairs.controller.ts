import { RequestHandler } from "express";
import { prisma} from 'services/db';
import { repairDetailsSchema } from "schemas/repairs";



export const repairAppointmentForm: RequestHandler = async (req, res) => {
  try {
    //const { body } = req;
    const { firstname, surname, email, phone, deviceType, service, dateAvailable, timeAvailable, fileSource, fileUrl, updates} = req.body;

    await prisma.repairs.create({
      data: {
        firstname,
        surname,
        email,
        phone,
        deviceType,
        service,
        dateAvailable,
        timeAvailable,
        fileSource,
        fileUrl,
        updates
      }
    })

    return res.status(201).json({ success: true, message: "Repair created successfully"});
  } catch (error) {
    console.error("Error creating repair:", error);
    return res.status(400).json({ success: false, message: "Error creating repair"});
  }
};