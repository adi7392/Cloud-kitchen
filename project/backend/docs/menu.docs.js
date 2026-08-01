/**
 * @swagger
 * /api/v1/menu/kitchen/{kitchenId}:
 *   get:
 *     summary: Get menu items for a kitchen
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [veg, non-veg, egg, vegan]
 *       - in: query
 *         name: foodType
 *         schema:
 *           type: string
 *           enum: [starter, main-course, dessert, beverage, snack, thali]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by item name
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItems:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 */

/**
 * @swagger
 * /api/v1/menu/{menuItemId}:
 *   get:
 *     summary: Get single menu item details
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItem:
 *                   $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 */