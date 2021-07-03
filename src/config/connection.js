import mongoose from 'mongoose';
const connectionString = 'mongodb://admin:admin@cluster0-shard-00-00.6txcm.mongodb.net:27017,cluster0-shard-00-01.6txcm.mongodb.net:27017,cluster0-shard-00-02.6txcm.mongodb.net:27017/meld?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

export default () => mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log('Database connected.'),
  (error) => console.log('Error in connecting to database', error),
);