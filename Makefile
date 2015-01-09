MOCHA_OPTS= --check-leaks
REPORTER = dot
#@NODE_ENV=test ./node_modules/.bin/mocha \
check: test

#test: test-unit test-acceptance
test: test-unit

test-unit:
	@NODE_ENV=test mocha \
		--timeout 30000 \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-acceptance:
	@NODE_ENV=test mocha \
		--reporter $(REPORTER) \
		--bail \
		test/acceptance/*.js

test-cov: lib-cov
	@APP_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

clean:
	rm -f coverage.html
	rm -fr lib-cov
	
#Run test continuously in the background
test-w:
  @NODE_ENV=test mocha \
    --reporter $(REPORTER) \
    --growl \
    --watch

#.PHONY: test test-unit test-acceptance test-w benchmark clean
.PHONY: test
