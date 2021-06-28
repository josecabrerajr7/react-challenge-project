const express   = require('express');
const Order     = require('../models/order.model');
const router    = express.Router();

// test api to see if the api is working
router.get('/test', (req, res) => {
    console.log('Test endpoint hit!');
    res.json({ success: true });
});

// getting the list of the current orders. This is helpful for an admin panel because the worker can see all the orders. There needs to be a route based on the person that logins and can only see his orders
router.get('/current-orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

// create a new order
router.post('/add-order', async (req, res) => {
    try {
        if (!req.body) {
                res.status(400).json({ success: false, error: 'No information sent.' })
            return;
        }

        if (!req.body.order_item) {
                res.status(400).json({ success: false, error: 'No order item sent.'});
            return;
        }

        if (!req.body.quantity) {
                res.status(400).json({ success: false, error: 'No quantity sent.'})
            return;
        }
        // creating the order object for posting
        const orderObj = new Order({
            order_item: req.body.order_item,
            quantity: req.body.quantity,
            ordered_by: req.body.ordered_by,
        });

        const dbResponse = await orderObj.save();
        
        if (dbResponse && dbResponse._id) {
            res.status(200).json({ success: true, insertedId: dbResponse._id });
        } else {
            res.status(400).json({ success: false, error: 'Database Error' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

// edit and order but it should not be a post. Need to switch to ".put"
router.put('/edit-order/:id', async (req, res) => {
    
    // expects id
    try {
        if (!req.params.id) {
                res.status(400).json({ success: false, error: 'No id supplied'});
            return;
        }

        // make sure an order exists in the database with that id
        const targetOrder = await Order.findOne({ _id: req.params.id });
            if (!targetOrder) {
                    res.status(400).json({ success: false, error: 'No order exists with that id!' });
                return;
        }

        const updateResponse = await Order.updateOne({
            _id: req.params.id
        }, {
            ordered_by: req.body.ordered_by,
            order_item: req.body.order_item,
            quantity: req.body.quantity
        });

        if (!updateResponse || !updateResponse.nModified) {
                res.status(400).json({ success: false, error: 'Error in database while updating' });
            return;
        }
            res.status(200).json({ success: true });
    } catch(error) {
        res.status(500).json({ success: false, error });
    }
});

// delete an order and it needs to be ".delete" not post
router.delete('/delete-order/:id', async (req, res) => {
    try {
        // expects id from params!
        if (!req.params.id) {
                res.status(400).json({ success: false, error: 'No id supplied' });
            return;
        }

        // make sure an order exists in the database with that id
        const targetOrder = await Order.findOne({ _id: req.params.id });
            if (!targetOrder) {
                    res.status(400).json({ success: false, error: 'No order exists with that id!' });
                return;
            }

        const deleteResponse = await Order.deleteOne({ _id: req.params.id });
            if (!deleteResponse || !deleteResponse.n) {
                    res.status(400).json({ success: false, error: 'Unable to delete from database' });
                return;
            }

            res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

// delete all orders not just one.
router.delete('/delete-all', async (req, res) => {
    try {
        // HITTING THIS ENDPOINT DELETES ALL ORDERS
        const deleteResponse = await Order.deleteMany({});
        if (!deleteResponse) {
                res.status(400).json({ success: false, error: 'Error deleting all orders.' });
            return;
        }
        res.status(200).json({ success: true, deleted: deleteResponse.n });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

module.exports = router;
