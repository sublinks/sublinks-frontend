import { mdToHtml as baseMd } from 'sublinks-markdown';
import sublinksClient from './client';
import parse, {Element} from 'html-react-parser';
import CommunityChip from '@/components/community-chip';

export function mdToHtml(md: string, domain: string): Promise<JSX.Element | JSX.Element[] | string> {
  return new Promise(async (resolve, reject) => {
    let markdown = await baseMd(md, domain);
    //const community = await sublinksClient().getCommunity({name: 'programming_horror'});

    const parsed = parse(
      markdown,
      {
        replace: (domNode) => {
          const domElement: Element = domNode as Element;

          if (domElement.name === 'a') {
            const href = domElement.attribs.href;
            //console.log(href)
            const match = href.match(/https?:\/\/(.*)\/c\/(.*)/);
            const match2 = href.match(/\/c\/(.*)@(.*)/);

            //console.log(match, match2)

            if (match) {
              //const url = match[1];
              const name = match[2];
              //const title = match[3];

              return <CommunityChip name={name} />;
            }

            if (match2) {
              //const url = match[1];
              const name = match2[1];
              //const title = match[3];

              return <CommunityChip name={name} />;
            }
          }
        }
      }
      );


    resolve(parsed);

/*
'use client'

import { mdToHtml as baseMd } from 'sublinks-markdown';
import sublinksClient from './client';
import parse, {DOMNode, Element, HTMLReactParserOptions} from 'html-react-parser';
import CommunityChip from '@/components/community-chip';
import Popover from '@/components/popover';
import { useEffect, useState } from 'react';

export async function mdToHtml(md: string, domain: string): Promise<JSX.Element | JSX.Element[] | string> {
  let markdown = await baseMd(md, domain);
    

  const [communities, setCommunities] = useState<any>({});

  function fetchCommunity(name: string) {
    return sublinksClient().getCommunity({name: name});
  }

  useEffect(() => {
    const urls = markdown.match(/https?:\/\/(.*)\/c\/(.*)/g) || [];
    const names = urls.map(url => url.split('/c/')[1]);

    Promise.all(names.map(fetchCommunity)).then(communityArray => {
      const newCommunities = communityArray.reduce((obj, community, i) => {
        obj[names[i]] = community;
        return obj;
      }, {});

      setCommunities(newCommunities);
    });
  }, [markdown]);

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      const domElement: Element = domNode as Element;

      if (domElement.name === 'a') {
        const href = domElement.attribs.href;
        const match = href.match(/https?:\/\/(.*)\/c\/(.*)/);

        if (match) {
          const name = match[2];
          const community = communities[name];

          if (community) {
            return <CommunityChip community={community.community_view.community} />;
          }
        }
      }
    }
  };

  return parse(markdown, options);
}
    */

    /*
    const object = <Markdown
    components={{
      a: ({ node, ...props }) => {
        return <a {...props} />;
      }
    }}
    children={markdown}
/>
    resolve(
      object
    )*/



    /*
    console.log(markdown)

    const matches = markdown.matchAll(/<a href="https?:\/\/(.*)\/c\/(.*)">(.*)<\/a>/g); // Replace community links with community chips
    if (matches) {
      while (true) {
        const match = matches.next();
        if (match.done) break;

        const url = match.value[1];
        const name = match.value[2];
        const title = match.value[3];

        const community = await sublinksClient().getCommunity({name: name});
        const chip = <CommunityChip community={community.community_view.community} />;
        markdown = markdown.replace(match.value[0], `${chip}`);
      }
    }

    console.log(markdown)
    console.log(parse(markdown))
    
    resolve(parse(markdown));*/
  });
}