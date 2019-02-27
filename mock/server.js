let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取轮播图 /sliders
let sliders = require('./sliders');

let pageSize = 5;

function read(cb) {
  fs.readFile("./book.json", 'utf-8', function (err, data) {
    // console.log(data);
    if (err && data.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(data)); // 将读出来的数据转化为对象
    }
  })
}

function write(data, cb) { // 写入内容
  fs.writeFile("./book.json", JSON.stringify(data), cb)
}

// read(function (books) { // books 代表所有的图书
//   console.log(books)
// });

// write({}, function () {
//   console.log('success')
// });


http.createServer((req, res) => {

  // 上线后这部分代码可以删除掉
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');

  /*让options请求快速返回*/
  if (req.method == "OPTIONS") {
    return res.end()
  }


  let {pathname, query} = url.parse(req.url, true); // true 把query转化为对象
  if (pathname === '/sliders') {
    console.log('one request');
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    return res.end(JSON.stringify(sliders))
  }


  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      let result = books.reverse().slice(offset, offset + pageSize);
      let hasMore = true; // 默认有更多
      if (books.length <= offset + pageSize) { // 已经显示的数目,大于了总共条数
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify({hasMore, result}));

    });
    return;
  }


  if (pathname === '/hot') {
    read(function (books) {
      let hot = books.reverse().splice(0, 6);
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      setTimeout(() => {
        res.end(JSON.stringify(hot));
      }, 3000);

    });
    return
  }

  if (pathname === '/book') { // 对图书进行增删改查
    let id = parseInt(query.id);
    switch (req.method) {
      case 'GET':
        if (!isNaN(id)) { // 查询一个
          read(function (books) {
            book = books.find(item => item.bookId === id)
            if (!book) {
              book = {}
            }
            res.setHeader('content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book));
          })

        } else { // 查询所有图书
          read(function (books) {
            res.setHeader('content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books.reverse()));
          })

        }
        break;
      case 'POST':
        console.log("POST --------- ");
        let str = '';
        req.on('data', chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
            books.push(book); // 将数据放到books中, books在内存中
            write(books, function () {
              res.end(JSON.stringify(book));
            });
          });
        });
        break;
      case 'PUT':
        if (id) {
          let str = '';
          req.on('data', chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str); // book要改成什么样子
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) {
                  return book
                }
                return item; // 其他正常返回即可
              });
              write(books, function () { // 将数据写回JSON中
                res.end(JSON.stringify(book));
              })
            })
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id);
          write(books, function () {
            res.end(JSON.stringify({})); // 删除返回空对象
          })
        });
        break;
    }
    return
  }

  // 读取一个路径
  fs.stat('.' + pathname, function (err, stats) {
    if (err) {
      // res.statusCode = 404;
      // res.end('Not Found');
      fs.createReadStream('index.html').pipe(res);
    } else {
      if (stats.isDirectory()) {
        let p = require('path').join('.' + pathname, './index.html');
        fs.createReadStream(p).pipe(res);
      } else {
        fs.createReadStream('.' + pathname).pipe(res);
      }

    }
  })


}).listen(3000);
