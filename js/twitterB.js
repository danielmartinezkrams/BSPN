/**
 * Created by h205p2 on 6/1/17.
 */
var allTweetText = [];
var texts = "";
var html = '<ul data-role="listview">';

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(this, function() {
    var domNode = '';
    var maxTweets = 20;
    var parseLinks = true;
    var queue = [];
    var inProgress = false;
    var printTime = true;
    var printUser = true;
    var formatterFunction = null;
    var supportsClassName = true;
    var showRts = true;
    var customCallbackFunction = null;
    var showInteractionLinks = true;
    var showImages = false;
    var targetBlank = true;
    var lang = 'en';
    var permalinks = true;
    var dataOnly = false;
    var script = null;
    var scriptAdded = false;

    function handleTweets(tweets) {
        if (customCallbackFunction === null) {
            var n = 0;
            var $twitterList = $("#twitterList");
            var placeHolder = "";
            while (n < tweets.length) {
                placeHolder += '<li>' + tweets[n] + '</li>';
                n++;
            }
            html += '</ul>';
            $twitterList.append(placeHolder);
        } else {
            customCallbackFunction(tweets);
        }
             console.log(tweets);
        //   console.log($('.tweet').text)
    }

    function strip(data) {
        return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, s) {
            return s;
        }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, '');
    }

    function targetLinksToNewWindow(el) {
        var links = el.getElementsByTagName('a');
        for (var i = links.length - 1; i >= 0; i--) {
            links[i].setAttribute('target', '_blank');
        }
    }

    function getElementsByClassName(node, classname) {
        var a = [];
        var regex = new RegExp('(^| )' + classname + '( |$)');
        var elems = node.getElementsByTagName('*');
        for (var i = 0, j = elems.length; i < j; i++) {
            if (regex.test(elems[i].className)) {
                a.push(elems[i]);
            }
        }
        return a;
    }

    function extractImageUrl(image_data) {
        if (image_data !== undefined && image_data.innerHTML.indexOf('data-srcset') >= 0) {
            var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
            return decodeURIComponent(data_src).split('"')[1];
        }
    }
    var twitterFetcher = {
        fetch: function(config) {
            console.log(config);
            if (config.maxTweets === undefined) {
                config.maxTweets = 20;
            }
            if (config.enableLinks === undefined) {
                config.enableLinks = true;
            }
            if (config.showUser === undefined) {
                config.showUser = true;
            }
            if (config.showTime === undefined) {
                config.showTime = true;
            }
            if (config.dateFunction === undefined) {
                config.dateFunction = 'default';
            }
            if (config.showRetweet === undefined) {
                config.showRetweet = true;
            }
            if (config.customCallback === undefined) {
                config.customCallback = null;
            }
            if (config.showInteraction === undefined) {
                config.showInteraction = true;
            }
            if (config.showImages === undefined) {
                config.showImages = false;
            }
            if (config.linksInNewWindow === undefined) {
                config.linksInNewWindow = true;
            }
            if (config.showPermalinks === undefined) {
                config.showPermalinks = true;
            }
            if (config.dataOnly === undefined) {
                config.dataOnly = false;
            }
            if (inProgress) {
                queue.push(config);
            } else {
                inProgress = true;
                domNode = config.domId;
                maxTweets = config.maxTweets;
                parseLinks = config.enableLinks;
                printUser = config.showUser;
                printTime = config.showTime;
                showRts = config.showRetweet;
                formatterFunction = config.dateFunction;
                customCallbackFunction = config.customCallback;
                showInteractionLinks = config.showInteraction;
                showImages = config.showImages;
                targetBlank = config.linksInNewWindow;
                permalinks = config.showPermalinks;
                dataOnly = config.dataOnly;
                var head = document.getElementsByTagName('head')[0];
                if (script !== null) {
                    head.removeChild(script);
                }
                script = document.createElement('script');
                script.type = 'text/javascript';
                if (config.list !== undefined) {
                    script.src = 'https://syndication.twitter.com/timeline/list?' + 'callback=__twttrf.callback&dnt=false&list_slug=' +
                        config.list.listSlug + '&screen_name=' + config.list.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
                } else if (config.profile !== undefined) {
                    script.src = 'https://syndication.twitter.com/timeline/profile?' + 'callback=__twttrf.callback&dnt=false' + '&screen_name=' + config.profile.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
                } else if (config.likes !== undefined) {
                    script.src = 'https://syndication.twitter.com/timeline/likes?' + 'callback=__twttrf.callback&dnt=false' + '&screen_name=' + config.likes.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
                } else {
                    script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
                        config.id + '?&lang=' + (config.lang || lang) + '&callback=__twttrf.callback&' + 'suppress_response_codes=true&rnd=' + Math.random();
                }
                head.appendChild(script);
                console.log(script);
                //$("#twitterFeed").append(script)

            }
        },
        callback: function(data) {
            if (data === undefined || data.body === undefined) {
                inProgress = false;
                if (queue.length > 0) {
                    twitterFetcher.fetch(queue[0]);
                    queue.splice(0, 1);
                }
                return;
            }
            data.body = data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, '');
            if (!showImages) {
                data.body = data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, '');
            }
            if (!printUser) {
                data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
            }
            var div = document.createElement('div');
            div.innerHTML = data.body;
            if (typeof(div.getElementsByClassName) === 'undefined') {
                supportsClassName = false;
            }

            function swapDataSrc(element) {
                var avatarImg = element.getElementsByTagName('img')[0];
                avatarImg.src = avatarImg.getAttribute('data-src-2x');
                return element;
            }
            var tweets = [];
            var authors = [];
            var times = [];
            var images = [];
            var rts = [];
            var tids = [];
            var permalinksURL = [];
            var j = 0;
            if (supportsClassName) {
                var tmp = div.getElementsByClassName('timeline-Tweet');
                while (j < tmp.length) {
                    if (tmp[j].getElementsByClassName('timeline-Tweet-retweetCredit').length > 0) {
                        rts.push(true);
                    } else {
                        rts.push(false);
                    }
                    if (!rts[j] || rts[j] && showRts) {
                        tweets.push(tmp[j].getElementsByClassName('timeline-Tweet-text')[0]);
                        tids.push(tmp[j].getAttribute('data-tweet-id'));
                        if (printUser) {
                            authors.push(swapDataSrc(tmp[j].getElementsByClassName('timeline-Tweet-author')[0]));
                        }
                        times.push(tmp[j].getElementsByClassName('dt-updated')[0]);
                        permalinksURL.push(tmp[j].getElementsByClassName('timeline-Tweet-timestamp')[0]);
                        if (tmp[j].getElementsByClassName('timeline-Tweet-media')[0] !== undefined) {
                            images.push(tmp[j].getElementsByClassName('timeline-Tweet-media')[0]);
                        } else {
                            images.push(undefined);
                        }
                    }
                    j++;
                }
            } else {
                var tt = getElementsByClassName(div, 'timeline-Tweet');
                while (j < tt.length) {
                    if (getElementsByClassName(tt[j], 'timeline-Tweet-retweetCredit').length > 0) {
                        rts.push(true);
                    } else {
                        rts.push(false);
                    }
                    if (!rts[j] || rts[j] && showRts) {
                        tweets.push(getElementsByClassName(tt[j], 'timeline-Tweet-text')[0]);
                        tids.push(tt[j].getAttribute('data-tweet-id'));
                        if (printUser) {
                            authors.push(swapDataSrc(getElementsByClassName(tt[j], 'timeline-Tweet-author')[0]));
                        }
                        times.push(getElementsByClassName(tt[j], 'dt-updated')[0]);
                        permalinksURL.push(getElementsByClassName(tt[j], 'timeline-Tweet-timestamp')[0]);
                        if (getElementsByClassName(tt[j], 'timeline-Tweet-media')[0] !== undefined) {
                            images.push(getElementsByClassName(tt[j], 'timeline-Tweet-media')[0]);
                        } else {
                            images.push(undefined);
                        }
                    }
                    j++;
                }
            }
            if (tweets.length > maxTweets) {
                tweets.splice(maxTweets, (tweets.length - maxTweets));
                authors.splice(maxTweets, (authors.length - maxTweets));
                times.splice(maxTweets, (times.length - maxTweets));
                rts.splice(maxTweets, (rts.length - maxTweets));
                images.splice(maxTweets, (images.length - maxTweets));
                permalinksURL.splice(maxTweets, (permalinksURL.length - maxTweets));
            }
            var arrayTweets = [];
            var length = tweets.length;
            var n = 0;
            if (dataOnly) {
                while (n < length) {
                    console.log(times[n].textContent);
                    arrayTweets.push({
                        tweet: tweets[n].innerHTML,
                        author: authors[n] ? authors[n].innerHTML : 'Unknown Author',
                        time: times[n].textContent,
                        timestamp: times[n].getAttribute('datetime').replace('+0000', 'Z').replace(/([\+\-])(\d\d)(\d\d)/, '$1$2:$3'),
                        image: extractImageUrl(images[n]),
                        rt: rts[n],
                        tid: tids[n],
                        permalinkURL: (permalinksURL[n] === undefined) ? '' : permalinksURL[n].href
                    });

                    n++;
                }
            } else {
                while (n < length) {
                    if (typeof(formatterFunction) !== 'string') {
                        var datetimeText = times[n].getAttribute('datetime');
                        var newDate = new Date(times[n].getAttribute('datetime').replace(/-/g, '/').replace('T', ' ').split('+')[0]);
                        var dateString = formatterFunction(newDate, datetimeText);
                        times[n].setAttribute('aria-label', dateString);
                        if (tweets[n].textContent) {
                            if (supportsClassName) {
                                times[n].textContent = dateString;
                            } else {
                                var h = document.createElement('p');
                                var t = document.createTextNode(dateString);
                                h.appendChild(t);
                                h.setAttribute('aria-label', dateString);
                                times[n] = h;
                            }
                        } else {
                            times[n].textContent = dateString;
                        }
                    }
                    //console.log(tweets);
                    //console.log(authors);
                    //console.log(times);
                    //console.log(images);
                    //console.log(rts);
                    //console.log(tids);
                    //console.log(permalinksURL);
                    var displayTweet = '';
                    if (parseLinks) {
                        if (targetBlank) {
                            targetLinksToNewWindow(tweets[n]);
                            if (printUser) {
                                targetLinksToNewWindow(authors[n]);
                            }
                        }
                        if (printUser) {
                            // console.log(tweets[n].textContent)
                            //console.log(strip(authors[n].innerHTML));
                            allTweetText.push(tweets[n].textContent);
                            texts += tweets[n].textContent +"%2C";
                            displayTweet += '<div class="user">' + strip(authors[n].innerHTML) + '</div>';
                        }
                        displayTweet += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
                        if (printTime) {
                            if (permalinks) {
                                displayTweet += '<p class="timePosted"><a href="' + permalinksURL[n] + '">' + times[n].getAttribute('aria-label') + '</a></p>';
                            } else {
                                displayTweet += '<p class="timePosted">' +
                                    times[n].getAttribute('aria-label') + '</p>';
                            }
                        }
                    } else {
                        if (tweets[n].textContent) {
                            if (printUser) {
                                displayTweet += '<p class="user">' + authors[n].textContent + '</p>';
                            }
                            displayTweet += '<p class="tweet">' + tweets[n].textContent + '</p>';
                            //console.log(tweets[n].textContent);
                            if (printTime) {
                                displayTweet += '<p class="timePosted">' + times[n].textContent + '</p>';
                            }
                        } else {
                            if (printUser) {
                                displayTweet += '<p class="user">' + authors[n].textContent + '</p>';
                            }
                            displayTweet += '<p class="tweet">' + tweets[n].textContent + '</p>';
                            if (printTime) {
                                displayTweet += '<p class="timePosted">' + times[n].textContent + '</p>';
                            }
                        }
                    }
                    if (showInteractionLinks) {
                        displayTweet += '<p class="interact"><a href="https://twitter.com/intent/' + 'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Reply </a><a href="https://twitter.com/intent/retweet?' + 'tweet_id=' + tids[n] + '" class="twitter_retweet_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Retweet </a>' + '<a href="https://twitter.com/intent/favorite?tweet_id=' + tids[n] + '" class="twitter_fav_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Favorite </a></p>';
                    }
                    if (showImages && images[n] !== undefined && extractImageUrl(images[n]) !== undefined) {
                        displayTweet += '<div class="media">' + '<img class="twitterImage" src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' + '</div>';
                    }
                    if (showImages) {
                        //console.log(displayTweet);
                        arrayTweets.push(displayTweet);
                    } else if (!showImages && tweets[n].textContent.length) {
                        //console.log(displayTweet);
                        arrayTweets.push(displayTweet);
                    }
                    n++;
                }
            }
            //  console.log(arrayTweets)
            handleTweets(arrayTweets);
            inProgress = false;
            if (queue.length > 0) {
                twitterFetcher.fetch(queue[0]);
                queue.splice(0, 1);
            }
        }
    };
    window.__twttrf = twitterFetcher;
    window.twitterFetcher = twitterFetcher;
    //console.log(allTweetText);
    return twitterFetcher;

}));


