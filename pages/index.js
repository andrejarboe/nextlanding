import Head from "next/head";
import Layout from "../components/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import moment from "moment";

export default function Index({ post }) {
  return (
    <Layout>
      <Head>
        <title>Andre's Blog</title>
      </Head>
      {/* Banner */}
      <section id="banner" className="major">
        <div className="inner">
          <header className="major">
            <h1>Hi, my name is Forty</h1>
          </header>
          <div className="content">
            <p>
              A responsive site template designed by HTML5 UP
              <br />
              and released under the Creative Commons.
            </p>
            <ul className="actions">
              <li>
                <a href="#one" className="button next scrolly">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Main */}
      <div id="main">
        {/* One */}
        <section id="one" className="tiles">
          {/* loop over post  */}
          {post.map((post) => (
            <article>
              <span className="image">
                <img src={`./assets/images/${post.featured_image}`} alt="" />
              </span>
              <header className="major">
                <h3>
                  <a href={`./${post.slug}`} className="link">
                    {post.title}
                  </a>
                </h3>
                {/* <p>Ipsum dolor sit amet</p> */}
              </header>
            </article>
          ))}
        </section>
        {/* Two */}
        <section id="two">
          <div className="inner">
            <header className="major">
              <h2>Massa libero</h2>
            </header>
            <p>
              Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
              libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
              Pellentesque condimentum sem. In efficitur ligula tate urna.
              Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor.
              Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis
              libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra
              et feugiat tempus.
            </p>
            <ul className="actions">
              <li>
                <a href="landing.html" className="button next">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const sortPost = () => {
    const allPost = fs.readdirSync("post").map((filename) => {
      const file = fs.readFileSync(path.join("post", filename)).toString();

      const postData = matter(file);
      /*
       * Example:
       * {
       *    title: 'Top JavaScript Frameworks',
       *    slug: 'top-javascript-frameworks',
       *    featured_image: 'top-javascript-frameworks.jpg',
       *    date: '2021-03-03 12:22:33'
       *  }
       *
       */
      // console.log(file);

      return {
        content: postData.content,
        title: postData.data.title,
        featured_image: postData.data.featured_image,
        date: postData.data.date,
        slug: postData.data.slug,
      };
      // console.log(`name: ${data.data.date}`);
    });

    return allPost.sort(
      (a, b) =>
        new moment(b.date, "YYYY-MM-DD HH:mm:ss") -
        new moment(a.date, "YYYY-MM-DD HH:mm:ss")
    );
  };

  // console.log(fs.readdirSync("post"));
  // sortPost()
  // console.log(sortPost());

  return {
    props: {
      post: sortPost(),
    },
  };
};
