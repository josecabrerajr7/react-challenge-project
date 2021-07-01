const express   = require('express');
const Order     = require('../models/order.model');
const router    = express.Router();

// test api to see if the api is working
router.get('/', (req, res) => {
    console.log('handle root');
    res.json({ success: true });
});

// getting the list of the current orders. This is helpful for an admin panel because the worker can see all the orders. There needs to be a route based on the person that logins and can only see his orders
router
    .route("/orders")
    .get(async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json({ success: true, orders });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }).post(async (req, res) => {
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


router.put("/edit-order/:id", async (req, res) => {
        try  {
            // have to make sure the id is being sent in with the data
            if (!req.body._id) res.status(400).json({ success: false, error: 'No id supplied'});

            // make sure an order exists in the database with the id. if exist update the document as well with the new values
            await Order.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, docs) => {

                if (!docs) res.status(400).json({ success: false, error: 'No order exists with that id!' });
                
                if(err) {
                    res.status(400).json({ success: false, error: 'Error in database while updating' });
                } else {
                    res.status(200).json({ success: true }); 
                }
            });
        } catch(error) {
            res.status(500).json({ success: false, error });
        }
});

router.delete("/delete-order/:id", async (req, res) => {
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
