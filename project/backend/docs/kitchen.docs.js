/**
 * @swagger
 * /api/v1/kitchens:
 *   get:
 *     summary: Browse all open kitchens
 *     tags: [Kitchens]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Filter by cuisine type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by kitchen name
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
 *         description: List of kitchens with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kitchens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Kitchen'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */

/**
 * @swagger
 * /api/v1/kitchens/{kitchenId}:
 *   get:
 *     summary: Get kitchen details by ID
 *     tags: [Kitchens]
 *     parameters:
 *       - in: path
 *         name: kitchenId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitchen details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kitchen:
 *                   $ref: '#/components/schemas/Kitchen'
 *       404:
 *         description: Kitchen not found
 */