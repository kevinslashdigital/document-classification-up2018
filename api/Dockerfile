FROM python:3.4-alpine
ADD . /api-code
WORKDIR /api-code
RUN wget -O CRF.tar.gz https://www.dropbox.com/s/e3k8ggknq9a7q4v/CRF%2B%2B-0.58.tar.gz?dl=1 && unzip CRF.tar.gz
RUN cd /api-code
RUN ls
RUN pip install -r requirements.txt
CMD ["flask", "run"]