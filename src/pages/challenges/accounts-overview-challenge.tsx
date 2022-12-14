import Button from 'components/common/button';
import Card from 'components/common/card';
import NavElement from 'components/common/layout/header/nav-element';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { cn } from 'utils';

const AccountsOverviewChallengePage: NextPage = () => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Accounts Overview');
    const [hunter, setHunter] = useState('');

    const [answerTwo, setSecondAnswer] = useState('');
    const [answerOne, setFirstAnswer] = useState('');
    const [answerThree, setThirdAnswer] = useState('');
    const [answerFour, setFourAnswer] = useState('');
    const [submission, setSubmission] = useState('');
    const [challengeID, setChallengeID] = useState('221007030');
    const [points, setPoints] = useState(100);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points 22 🔥

___
### Description
In this challenge we're going to test your knowledge of Solana accounts.

Let's get into it ${session?.user?.name}!

1. Preview the Solana Bytes video on <a href="https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=1" target="_blank">The Solana Programming Model</a>.
2. Look out for the answers to the challenge questions:
    - How can I find where an account is stored on-chain?    
    - What change to an account's data is the only exception to the signer rules?
    - If my program is the owner of an account, that allows my program to do what to the account?
    - If my account is a Program Derived Address (PDA), what's different about my keys?

3. Use the documentation provided as an additional resource!

### Tips:
- Listen closely and observe the whiteboard animations.
- If you have to, rewatch the video again!

### Resources:

<a href="https://docs.solana.com/developing/programming-model/accounts" target="_blank">Solana Developer Docs: Accounts</a>

<a href="https://solanacookbook.com/core-concepts/accounts.html#facts" target="_blank">Solana Cookbook Accounts</a>

<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>

___

### How to Submit
Your submission should include the following:
1. How can I find where an account is stored on-chain?
2. What change to an account's data is the only exception to the signer rules?
3. If my program is the owner of an account, that allows my program to do what to the account?
4. If my account is a Program Derived Address (PDA), what's different about my keys?


`,
    );

    const tabsDescription = useMemo(
        () => [
            {
                content: <Markdown>{description}</Markdown>,
                id: 'description',
                label: '',
            },
        ],
        [description],
    );

    const tabsSubmission = useMemo(
        () => [
            {
                content: (
                    <div>
                        {/* <Markdown>{`### Submit your answers`}</Markdown>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="1. How can I find where an account is stored on-chain?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setFirstAnswer(e.target.value)
                                }
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="2. What change to an account's data is the only exception to the signer rules?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e =>
                                    setSecondAnswer(e.target.value)
                                }
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. If my program is the owner of an account, that allows my program to do what to the account?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setThirdAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="4. If my account is a Program Derived Address (PDA), what's different about my keys?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setFourAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card> */}

                        {/* additional feedback, was it easy, suggestions, etc */}
                    </div>
                ),
                id: 'submission',
                label: 'Submission',
            },
        ],
        [],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || 'description';
    const currentTabSubbmisionId = (router.query.tab as string) || 'submission';

    const currentChallenge = useMemo(
        () => tabsDescription.find(tab => tab.id === currentTabId),
        [currentTabId, tabsDescription],
    );

    const currentSubmission = useMemo(
        () => tabsSubmission.find(tab => tab.id === currentTabSubbmisionId),
        [currentTabSubbmisionId, tabsSubmission],
    );

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        return;

        if (title === '' && hunter === '') {
            setValidHunter(false);
            setValidBountyName(false);
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        } else if (title === '') {
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            setValidBountyName(false);
            return;
        }
        const challengerName = session?.user?.name;
        const responseUser = await fetch(`/api/${challengerName}`);

        const user = await responseUser.json();

        // if (!user) {
        //     setValidHunter(false);
        //     hunterRef.current.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'center',
        //     });
        //     return;
        // }

        try {
            const submission = `
___
### Submission Entered:

Challenge Id: [#${challengeID}]

Hunter: ${session?.user?.name}






1. How can I find where an account is stored on-chain?
${answerOne}

2. What change to an account's data is the only exception to the signer rules?
${answerTwo}

3. If my program is the owner of an account, that allows my program to do what to the account?
${answerThree}

4. If my account is a Program Derived Address (PDA), what's different about my keys?
${answerFour}

`;
            setSubmission(submission);
            const response = await fetch('/api/bounties', {
                body: JSON.stringify({
                    // assignee: hunter,
                    assignee: challengerName,
                    body: description + submission,
                    title: `Challenge Submission: ` + title,
                    points,
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            const data = await response.json();
            if (response.ok) {
                alert('Submission Sent!');
                router.push('/challenges');
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    if (!session) {
        return (
            <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <TbBrandGithub size={35} />
                <Text variant="sub-heading">
                    Sign in with GitHub to view the challenge.
                </Text>

                <div className="flex flex-row gap-2">
                    <Link href="/" passHref>
                        <a>
                            <Button variant="transparent" text="Go back" />
                        </a>
                    </Link>
                    <Button
                        variant="orange"
                        text="Sign in"
                        onClick={async () => signIn('github')}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <NextSeo
                title="Display a Bounty"
                description="Display a bounty."
            ></NextSeo>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="label">
                        Bounty Challenge: #{challengeID}
                    </Text>
                    <div
                        className={cn(
                            'tooltip-bottom tooltip-error',
                            !validBountyName && 'tooltip tooltip-open',
                        )}
                        data-tip="Challenge name"
                    >
                        <div className="flex h-12 flex-col justify-between md:h-20">
                            <input
                                ref={titleRef}
                                readOnly={true}
                                className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl"
                                onChange={e => {
                                    setTitle(e.target.value);
                                    if (
                                        e.target.value !== '' &&
                                        !validBountyName
                                    )
                                        setValidBountyName(true);
                                }}
                                placeholder="Solana 101: Deploy a Program"
                                value={title}
                            />
                        </div>
                    </div>
                </section>
                <section
                    title="bounty-details"
                    className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8"
                >
                    <div className="flex flex-col gap-5">
                        <div className="sticky top-2 z-30 -mt-px flex h-2 flex-row gap-1 border-none bg-neutral bg-opacity-40 pt-2 backdrop-blur-xl">
                            <div className="flex h-full flex-row gap-4">
                                {tabsDescription.map((tab, index) => (
                                    <NavElement
                                        as={index === 0 && '/explorer/new'}
                                        href={`/explorer/new?tab=${tab.id}`}
                                        key={tab.id}
                                        label={tab.label}
                                        scroll={false} // TODO: Scroll to navbar position.
                                    />
                                ))}
                            </div>
                        </div>

                        {currentChallenge.content}
                        {currentSubmission.content}

                        {/*<div className="flex flex-row justify-end gap-2 text-right">
                            <Markdown>
                                **please review your entry before clicking
                                submit*
                            </Markdown>
                        </div>
                        <div className="width-full flex flex-row justify-end gap-2">
                            <Button
                                className="w-40"
                                type="submit"
                                variant="orange"
                                text="Submit"
                            />
                        </div> */}
                        {/* after submit, take them/offer to the next challenge.. */}
                    </div>
                </section>
            </form>
        </>
    );
};

export default AccountsOverviewChallengePage;
