/**
 * @swagger
 * /api/v1/admin/kitchen:
 *   post:
 *     summary: Create a new kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, street, city, state, pincode]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cuisine:
 *                 type: string
 *                 description: Comma-separated cuisine types
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               deliveryTime:
 *                 type: number
 *               deliveryCharge:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Kitchen created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admins only
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/menu:
 *   post:
 *     summary: Add a menu item to a kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, price, category, foodType]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [veg, non-veg, egg, vegan]
 *               foodType:
 *                 type: string
 *                 enum: [starter, main-course, dessert, beverage, snack, thali]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/menu/{menuItemId}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [veg, non-veg, egg, vegan]
 *               foodType:
 *                 type: string
 *                 enum: [starter, main-course, dessert, beverage, snack, thali]
 *               isAvailable:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Menu item not found
 *
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/orders:
 *   get:
 *     summary: Get all orders for a kitchen
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [placed, confirmed, preparing, out_for_delivery, delivered, cancelled]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of kitchen orders with pagination
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * /api/v1/admin/kitchen/{kitchenId}/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderStatus]
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [confirmed, preparing, out_for_delivery, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid status or order already completed
 *       403:
 *         description: Order does not belong to your kitchen
 */