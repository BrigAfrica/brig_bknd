import { RequestHandler } from "express";
import { prisma} from 'services/db';



export const repairAppointmentForm: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    //const { firstname, surname, email, phone, deviceType, service, dateAvailable, timeAvailable, fileSource, fileUrl, updates} = req.body;

    await prisma.repairs.create({
      data: {
        firstname: body.firstname,
        surname: body.surname,
        email: body.email,
        phone: body.phone,
        deviceType: body.deviceType,
        service: body.service,
        dateAvailable: body.dateAvailable,
        timeAvailable: body.timeAvailable,
        fileSource: body.fileSource,
        fileUrl: body.fileUrl,
        updates: body.updates
      }
    })

    return res.status(201).json({ success: true, message: "Repair created successfully"});
  } catch (error) {
    console.error("Error creating repair:", error);
    return res.status(400).json({ success: false, message: "Error creating repair"});
  }
};