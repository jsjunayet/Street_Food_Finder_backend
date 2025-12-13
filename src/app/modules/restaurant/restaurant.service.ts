import { prisma } from "../../share/prismaClient";

const createRestaurant = async (data: any, ownerId: string) => {
  return await prisma.restaurant.create({
    data: {
      name: data.name,
      description: data.description,
      images: data.images || [],
      location: data.location,
      address: data.address,
      phone: data.phone || null,
      email: data.email || null,
      website: data.website || null,
      openingHours: data.openingHours || null,
      specialties: data.specialties || [],
      highlights: data.highlights || [],
      owner: {
        connect: { id: ownerId },
      },
    },
  });
};

// Get all Restaurants
const getAllRestaurants = async () => {
  return await prisma.restaurant.findMany({
    include: { menuItems: true, owner: true },
  });
};

const getRestaurantById = async (ownerId: string) => {
  return await prisma.restaurant.findMany({
    where: { ownerId },
    include: { menuItems: true },
  });
};

// Get single Restaurant
const getRestaurantByIdParams = async (id: string) => {
  return await prisma.restaurant.findUnique({
    where: { id },
    include: { menuItems: true },
  });
};

// Update Restaurant
const updateRestaurant = async (id: string, data: any) => {
  return await prisma.restaurant.update({
    where: { id },
    data,
  });
};

// Delete Restaurant
const deleteRestaurant = async (id: string) => {
  return await prisma.restaurant.delete({
    where: { id },
  });
};

// MenuItem CRUD

// Create MenuItem
const createMenuItem = async (restaurantId: string, data: any) => {
  return await prisma.menuItem.create({
    data: {
      ...data,
      restaurantId,
    },
  });
};

// Update MenuItem
const updateMenuItem = async (id: string, data: any) => {
  // Optional: check if record exists first
  const existing = await prisma.menuItem.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("MenuItem not found");
  }

  return await prisma.menuItem.update({
    where: { id },
    data,
  });
};

// Delete MenuItem
const deleteMenuItem = async (id: string) => {
  const existing = await prisma.menuItem.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("MenuItem not found");
  }

  return await prisma.menuItem.delete({ where: { id } });
};

export const restaurantService = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getRestaurantByIdParams,
};
