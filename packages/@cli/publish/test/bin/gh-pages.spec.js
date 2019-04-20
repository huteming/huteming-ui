const ghpages = require('../../lib/index');
const sinon = require('sinon');
const cli = require('../../bin/tommy-version')
const assert = require('../helper').assert;

describe('gh-pages', () => {
    describe('main', () => {
        beforeEach(() => {
            sinon
                .stub(ghpages, 'publish')
                .callsFake((basePath, config, callback) => callback())
        })

        afterEach(() => {
            ghpages.publish.restore()
        })

        const defaults = {
            repo: undefined,
            silent: false,
            branch: 'gh-pages',
            src: '**/*',
            dest: '.',
            message: 'Updates',
            dotfiles: false,
            add: false,
            remote: 'origin',
        }

        const scenarios = [
            {
                args: ['--dist', 'lib', '-m', 'Updates'],
                dist: 'lib',
                config: defaults
            },
            {
                args: ['--dist', 'lib', '-x'],
                dist: 'lib',
                config: {silent: true}
            },
            {
                args: ['--dist', 'lib', '--dotfiles'],
                dist: 'lib',
                config: {dotfiles: true}
            },
            {
                args: ['--dist', 'lib', '--dest', 'target'],
                dist: 'lib',
                config: {dest: 'target'}
            },
            {
                args: ['--dist', 'lib', '-a', 'target'],
                dist: 'lib',
                config: {add: true}
            },
            {
                args: ['--dist', 'lib', '--user', 'Full Name <email@example.com>'],
                dist: 'lib',
                config: {user: {name: 'Full Name', email: 'email@example.com'}}
            },
            {
                args: ['--dist', 'lib', '--user', 'email@example.com'],
                dist: 'lib',
                config: {user: {name: null, email: 'email@example.com'}}
            },
            {
                args: ['--dist', 'lib', '-u', 'Full Name <email@example.com>'],
                dist: 'lib',
                config: {user: {name: 'Full Name', email: 'email@example.com'}}
            },
            {
                args: ['--dist', 'lib', '-u', 'junk email'],
                dist: 'lib',
                error:
                'Could not parse name and email from user option "junk email" (format should be "Your Name <email@example.com>")'
            }
        ];

        scenarios.forEach(({args, dist, config, error}) => {
            let title = args.join(' ')
            if (error) {
                title += ' (user error)'
            }
            it(title, done => {
                cli(['node', 'tommy-version'].concat(args))
                    .then(() => {
                        if (error) {
                            done(new Error(`Expected error "${error}" but got success`));
                            return;
                        }
                        sinon.assert.calledWithMatch(ghpages.publish, dist, config)
                        done();
                    })
                    .catch(err => {
                        if (!error) {
                            done(err);
                            return;
                        }
                        assert.equal(err.message, error);
                        done();
                    })
            })
        })
    })
})
