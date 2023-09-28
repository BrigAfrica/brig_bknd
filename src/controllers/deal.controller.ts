import { RequestHandler } from "express";
import { prisma } from 'services/db';
import { createDealSchema } from "schemas/deals";
import { z } from "zod";

type CreateDealschema = z.infer<typeof createDealSchema>

export const addDeal: RequestHandler = async (req, res) => {
  //const { body } = req.body;


  try {
    const {
      discountPercentage,
      originalPrice,
      discountedPrice,
      startDate,
      endDate,
      availableQuantity,
      status,
      priority,
      productId,
    } = req.body;

    var newStartDate = new Date(startDate);
    var newEndDate = new Date(endDate);

    const productExists = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    const newDeal = await prisma.deal.create({
      data: {
        discountPercentage,
        originalPrice,
        discountedPrice,
        startDate: newStartDate,
        endDate: newEndDate,
        availableQuantity,
        status,
        priority,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    return res.status(201).json({ success: true, message: "Deal created successfully", deal: newDeal});
  } catch (error) {
    console.error("Error creating deal:", error);
    return res.status(400).json({ success: false, message: "Unable to create deal"});
  }
};

export const getAllDeals: RequestHandler =async (req, res) => {
  try{
    const deals = await prisma.deal.findMany();

    res.status(200).json(deals);
  }catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Unable to fetch deals' });
  }
};

export const getActiveDeals: RequestHandler =async (req, res) => {
  try {
    const currentDate = new Date();

    const activeDeals = await prisma.deal.findMany({
      where: {
        startDate: {
          lte: currentDate,
        },
        endDate: {
          gte: currentDate,
        },
        status: 'ACTIVE',
      },
      include: {
        product: {
          select: {
            name: true,
            boxImage: true,
          },
        },
      },
    });

    res.status(200).json(activeDeals);
  } catch (error) {
    console.error('Error fetching active deals:', error);
    res.status(500).json({ error: 'Unable to fetch active deals' });
  }
}